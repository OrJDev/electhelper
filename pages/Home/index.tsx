import React from 'react';
import { ArrowBack, Clicker, KeysInput, KeysPicker, Wrapper } from '../../components';
import styles from './styles';
import { arrayToMap, getterAndSetter } from '../../functions/values';
import { IOptionalFields, IOptionalKeys, IPossibleTypes, ITransistor, IValues } from '../../types/Values';
import { isTransistor } from '../../functions/types';
import { defaultValues, transValues } from '../../constants/stateValues';
import { useNavigation } from '@react-navigation/native';

interface IProps { }

const Home: React.FC<IProps> = ({ }) => {
    const navigation = useNavigation();
    let [displayType, setDisplayType] = React.useState<IPossibleTypes>('solver');
    const [values, setValues] = React.useState<IValues>(() => arrayToMap(defaultValues));
    const [transistorValues, setTransistorValues] = React.useState<ITransistor>(() => arrayToMap(transValues))

    const [currentState, setCurrentState] =
        getterAndSetter([setValues, setTransistorValues], [values, transistorValues], displayType);
    function clearState() {
        let newVal = arrayToMap(isTransistor(displayType) ? transValues : defaultValues);
        setCurrentState(newVal)
    }
    return (
        <Wrapper arrow={<ArrowBack name='delete' onPress={clearState} />}>
            <KeysPicker
                selectedValue={displayType}
                setValue={setDisplayType}
                label='Display type'
                values={['transistor', 'solver']}
            />
            <KeysInput
                keys={currentState}
                style={styles.smTop}
                setItem={(key, val) => setCurrentState(old => ({ ...old, [key]: val }))}
            />
            <Clicker
                label='Submit'
                style={styles.top}
                onPress={() => navigation.navigate('Formulas', { currentState })}
            />
        </Wrapper>
    )
}

export default Home;