import React from 'react';
import { Clicker, KeysInput, KeysPicker, Logo } from '../../components';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { arrayToMap, defaultValues, transValues } from '../../functions/values';
import { IOptionalFields, IOptionalKeys, IPossibleTypes, ITransistor, IValues } from '../../types/Values';
import { isTransistor } from '../../functions/types';

interface IProps { }

const Home: React.FC<IProps> = ({ }) => {
    let [displayType, setDisplayType] = React.useState<IPossibleTypes>('default');
    const [values, setValues] = React.useState<IValues>(() => arrayToMap(defaultValues));
    const [transistorValues, setTransistorValues] = React.useState<ITransistor>(() => arrayToMap(transValues))
    function UpdateState(key: IOptionalKeys, value: number) {
        if (isTransistor(key, true)) {
            setTransistorValues(old => ({ ...old, [key]: value }))
        } else {
            setValues(old => ({ ...old, [key]: value }))
        }
    }
    let currentSate: IOptionalFields = isTransistor(displayType) ? transistorValues : values;
    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Logo />
            <KeysPicker
                selectedValue={displayType}
                setValue={setDisplayType}
                label='Display type'
                values={['transistor', 'default']}
            />
            <KeysInput
                keys={currentSate}
                style={styles.smTop}
                setItem={(key, val) => UpdateState(key, val)}
            />
            <Clicker
                label='Submit'
                style={styles.top}
                onPress={() => true}
            />
        </KeyboardAwareScrollView>
    )
}

export default Home;