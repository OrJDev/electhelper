import React from 'react';
import { Text } from 'react-native';
import { Wrapper } from './components';
import fonts from './constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ISettings from './types/Settings';
import { IOptionalFields, IOptionalKeys, IPossibleTypes } from './types/Values';
import { filterdValues, getFilteredAndKeys, requirementsValues } from './functions/values';
import forms from './constants/formulas';
import { ICategory } from './types/Formulas';

interface IProps { }


type IGetterSetter<T = boolean> = {
    get: T;
    set: (val: T) => void;
}
type IGetterAdder<T = any[]> = {
    get: T;
    add: (val: any) => void;
    remove: (val: any) => void;
}
type IContext = {
    ignoreValues: IGetterSetter;
    includeUnits: IGetterSetter;
    holdForModal: IGetterSetter;
    useLookingFor: IGetterSetter;
    lookForValues: IGetterAdder<any[]>;
    dType: IGetterSetter<ICategory>;
    possibleFields: Partial<IOptionalFields>
    possibleKeys: IOptionalKeys[]
}
const MContext = React.createContext({} as IContext)
export default MContext;
/**
 * @todo add more settings
 */
let defaultSettings: ISettings = {
    ignoreValues: false,
    includeUnits: true,
    holdForModal: true,
    useLookingFor: false,
    lookForValues: {
        transistor: [],
        default: []
    },
    dType: 'default'
}
export const ContextProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = React.useState(true);
    const [currentSettings, setCurrentSettings] = React.useState<ISettings>(defaultSettings)
    const [possibleKeys, setPossibleKeys] = React.useState<IOptionalKeys[]>([])
    const [possibleFields, setPossibleFields] = React.useState<IOptionalFields>({} as any);

    React.useEffect(() => {
        (async () => {
            let results = await AsyncStorage.getItem('settings');
            if (results) {
                InitSetings(JSON.parse(results))
            } else {
                await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings))
            }
            setLoading(false)
        })()
    }, [])

    async function updateStorage(valueKey: keyof ISettings, value: any) {
        try {
            setCurrentSettings({ ...currentSettings, [valueKey]: value })
            await AsyncStorage.setItem('settings', JSON.stringify({ ...currentSettings, [valueKey]: value }))
        } catch { }
    }
    const getProperty = (key: keyof ISettings): any => {
        let results: any = currentSettings[key] ?? defaultSettings[key];
        return results;
    }

    async function InitSetings(settings: any) {
        let newSettings: Partial<ISettings> = {}
        let keys = Object.keys(settings);
        let shouldBeSet = false;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i] as keyof typeof settings;
            if (settings[key] !== undefined) {
                newSettings[key as keyof typeof newSettings] = settings[key]
            } else {
                newSettings[key as keyof typeof newSettings] = getProperty(key as any)
                shouldBeSet = true;
            }
        }
        if (shouldBeSet) {
            await AsyncStorage.setItem('settings', JSON.stringify(newSettings))
        } else {
            addKeys(newSettings.lookForValues?.default, 'default')
            addKeys(newSettings.lookForValues?.transistor, 'transistor')
        }
        handleKeys(newSettings.dType ?? 'default')
        setCurrentSettings(newSettings as ISettings)
    }
    const updateKeys = (newType: ICategory) => {
        updateStorage('dType', newType)
        handleKeys(newType)
        setPossibleFields({} as any)
    }

    function handleKeys(newType: ICategory) {
        let formulas = forms.filter(e => e.category === newType);
        let optionalKeys = filterdValues([], formulas, true)
        setPossibleKeys(optionalKeys as any)
    }

    function updateKey(key: any, r?: boolean) {
        let arr = r ? currentSettings.lookForValues[currentSettings.dType]
            .filter(e => e.toLowerCase() !== key.toLowerCase())
            :
            [...currentSettings.lookForValues[currentSettings.dType], key]
        let [, t] = getFilteredAndKeys(arr)
        setPossibleFields(t);
    }

    function addKeys(key: any[] | undefined, type: ICategory) {
        if (key) {
            let [, t] = getFilteredAndKeys([...currentSettings.lookForValues[type], ...key],
                forms.filter(e => e.category === type))
            setPossibleFields(t)
        }
    }

    return (
        <MContext.Provider value={{
            ignoreValues: {
                get: getProperty('ignoreValues'),
                set: (val: boolean) => updateStorage('ignoreValues', val)
            },
            includeUnits: {
                get: getProperty('includeUnits'),
                set: (val: boolean) => updateStorage('includeUnits', val)
            },
            holdForModal: {
                get: getProperty('holdForModal'),
                set: (val: boolean) => updateStorage('holdForModal', val)
            },
            lookForValues: {
                get: getProperty('lookForValues')[currentSettings.dType] ?? [],
                add: (val: any) => {
                    updateKey(val);
                    let newObj: any = {
                        ...currentSettings.lookForValues,
                        [currentSettings.dType]:
                            [...currentSettings.lookForValues[currentSettings.dType], val]
                    }
                    updateStorage('lookForValues', newObj)
                },
                remove: (val: any) => {
                    updateKey(val, true);
                    let newObj = {
                        ...currentSettings.lookForValues,
                        [currentSettings.dType]:
                            currentSettings.lookForValues[currentSettings.dType]
                                .filter(r => r.toLowerCase() !== val.toLowerCase())
                    }
                    updateStorage('lookForValues', newObj)
                }
            },
            useLookingFor: {
                get: getProperty('useLookingFor'),
                set: (val: boolean) => updateStorage('useLookingFor', val)
            },
            dType: {
                get: getProperty('dType'),
                set: (val: ICategory) => updateKeys(val)
            },
            possibleFields,
            possibleKeys
        }}>
            {loading ? <Wrapper>
                <Text style={fonts.h2}>Loading...</Text>
            </Wrapper> : children}
        </MContext.Provider>
    )
}

