import React from 'react';
import { ArrowBack, Clicker, KeysInput, KeysPicker, Wrapper } from '../../components';
import styles from './styles';
import { getterAndSetter } from '../../functions/values';
import { IPossibleTypes, ITransistor, IValues } from '../../types/Values';
import { isTransistor } from '../../functions/values';
import { defaultValues, transValues } from '../../constants/stateValues';
import { useNavigation } from '@react-navigation/native';

interface IProps { }

const Home: React.FC<IProps> = ({ }) => {
    const navigation = useNavigation();
    let [displayType, setDisplayType] = React.useState<IPossibleTypes>('solver');
    const [values, setValues] = React.useState<IValues>(defaultValues);
    const [transistorValues, setTransistorValues] = React.useState<ITransistor>(transValues)
    const [sDisplay, setSDisplay] = React.useState(false);
    const [currentState, setCurrentState] =
        getterAndSetter([setValues, setTransistorValues], [values, transistorValues], displayType);
    const clearState = () => setCurrentState(isTransistor(displayType) ? transValues : defaultValues);
    const navigateTo = () => navigation.navigate('Formulas', { currentState })
    return (
        <Wrapper arrow={
            <>
                <ArrowBack name='delete' onPress={clearState} />
                {sDisplay ? <ArrowBack right name='check' onPress={navigateTo} /> : null}
            </>
        } onSDisplay={(v) => setSDisplay(v)}>
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
                onPress={navigateTo}
            />
        </Wrapper>
    )
}

export default Home;