import React from 'react';
import { Clicker, KeysInput, KeysPicker, Wrapper } from '../../components';
import styles from './styles';
import { arrayToMap } from '../../functions/values';
import { IOptionalFields, IOptionalKeys, IPossibleTypes, ITransistor, IValues } from '../../types/Values';
import { isTransistor } from '../../functions/types';
import { defaultValues, transValues } from '../../constants/stateValues';
import { useNavigation } from '@react-navigation/native';

interface IProps { }

const Home: React.FC<IProps> = ({ }) => {
    const navigation = useNavigation();
    let [displayType, setDisplayType] = React.useState<IPossibleTypes>('default');
    const [values, setValues] = React.useState<IValues>(() => arrayToMap(defaultValues));
    const [transistorValues, setTransistorValues] = React.useState<ITransistor>(() => arrayToMap(transValues))
    let currentSate: IOptionalFields = isTransistor(displayType) ? transistorValues : values;
    function UpdateState(key: IOptionalKeys, value: number) {
        if (isTransistor(key, true)) {
            setTransistorValues(old => ({ ...old, [key]: value }))
        } else {
            setValues(old => ({ ...old, [key]: value }))
        }
    }
    return (
        <Wrapper>
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
                onPress={() => navigation.navigate('Formulas', { currentSate })}
            />
        </Wrapper>
    )
}

export default Home;