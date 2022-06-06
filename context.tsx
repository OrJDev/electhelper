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
    lookForValues: IGetterAdder<any[]>
    dType: IGetterSetter<ICategory>;
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
    lookForValues: [],
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
            await AsyncStorage.setItem('settings', JSON.stringify({ ...currentSettings, [valueKey]: value }))
            setCurrentSettings({ ...currentSettings, [valueKey]: value })
        } catch { }
    }
    const getProperty = (key: keyof ISettings): any => {
        let results = currentSettings.hasOwnProperty(key) ?
            currentSettings[key] :
            defaultSettings[key];
        // if (key === 'lookForValues') console.log({ results })
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
        }
        handleKeys(newSettings.dType ?? 'default')
        setCurrentSettings(newSettings as ISettings)
    }
    async function updateKeys(newType: ICategory) {
        handleKeys(newType)
        updateStorage('dType', newType)
    }

    function handleKeys(newType: ICategory) {
        let formulas = forms.filter(e => e.category === newType);
        let keyResults = requirementsValues(formulas);
        setPossibleFields(keyResults as any)
        let optionalKeys = filterdValues([], formulas, true)
        setPossibleKeys(optionalKeys as any)
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
                get: getProperty('lookForValues'),
                add: (val: any) => {
                    updateStorage('lookForValues', [...currentSettings.lookForValues, val])
                },
                remove: (val: any) => {
                    let newValues = currentSettings.lookForValues
                        .filter(r => r.toLowerCase() !== val.toLowerCase())
                    updateStorage('lookForValues', newValues)

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
            possibleKeys
        }}>
            {loading ? <Wrapper>
                <Text style={fonts.h2}>Loading...</Text>
            </Wrapper> : children}
        </MContext.Provider>
    )
}

