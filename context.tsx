import React from 'react';
import { Text } from 'react-native';
import { Wrapper } from './components';
import fonts from './constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ISettings from './types/Settings';

interface IProps { }

type IContext = {
    setIgnoreValues: React.Dispatch<React.SetStateAction<boolean>>;
    ignoreValues: boolean;
}
const MContext = React.createContext({} as IContext)
export default MContext;
/**
 * @todo add more settings
 */
let defaultSettings: ISettings = { ignoreValues: false }
export const ContextProvider: React.FC<IProps> = ({ children }) => {
    const [ignoreValues, setIgnoreValues] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [currentSettings, setCurrentSettings] = React.useState<ISettings>(defaultSettings)

    React.useEffect(() => {
        (async () => {
            let results = await AsyncStorage.getItem('settings');
            if (results) {
                let re = JSON.parse(results)
                setIgnoreValues(re.ignoreValues)
                setCurrentSettings(re)
            } else {
                await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings))
            }
            setLoading(false)
        })()
    }, [])
    React.useEffect(() => {
        updateStorage('ignoreValues', ignoreValues)
    }, [ignoreValues])

    async function updateStorage(valueKey: keyof ISettings, value: any) {
        try {
            await AsyncStorage.setItem('settings', JSON.stringify({ ...currentSettings, [valueKey]: value }))
        } catch { }
    }
    return (
        <MContext.Provider value={{ ignoreValues, setIgnoreValues }}>
            {loading ? <Wrapper>
                <Text style={fonts.h2}>Loading...</Text>
            </Wrapper> : children}
        </MContext.Provider>
    )
}

