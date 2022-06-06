import React from 'react';
import { Text } from 'react-native';
import { Wrapper } from './components';
import fonts from './constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ISettings from './types/Settings';

interface IProps { }

type IGetterSetter = {
    get: boolean;
    set: (val: boolean) => void;
}
type IContext = {
    ignoreValues: IGetterSetter;
    includeUnits: IGetterSetter;
    holdForModal: IGetterSetter;
}
const MContext = React.createContext({} as IContext)
export default MContext;
/**
 * @todo add more settings
 */
let defaultSettings: ISettings = { ignoreValues: false, includeUnits: true, holdForModal: true }
export const ContextProvider: React.FC<IProps> = ({ children }) => {
    const [loading, setLoading] = React.useState(true);
    const [currentSettings, setCurrentSettings] = React.useState<ISettings>(defaultSettings)

    React.useEffect(() => {
        (async () => {
            let results = await AsyncStorage.getItem('settings');
            if (results) {
                let re = JSON.parse(results)
                setCurrentSettings(re)
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
    const getProperty = (key: keyof ISettings) =>
        currentSettings.hasOwnProperty(key) ?
            currentSettings[key] :
            defaultSettings[key]

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
            }
        }}>
            {loading ? <Wrapper>
                <Text style={fonts.h2}>Loading...</Text>
            </Wrapper> : children}
        </MContext.Provider>
    )
}

