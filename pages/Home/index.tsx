import React from 'react';
import { Clicker, KeysInput, KeysPicker, Logo } from '../../components';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { arrayToMap, defaultValues, transValues } from '../../functions/values';

interface IProps { }

const Home: React.FC<IProps> = ({ }) => {
    let [displayType, setDisplayType] = React.useState<'transistor' | 'default'>('default');
    const isTransistor = (type: typeof displayType): type is 'transistor' => type === 'transistor';
    const [values, setValues] = React.useState(() => arrayToMap(defaultValues));
    const [transistorValues, setTransistorValues] = React.useState(() => arrayToMap(transValues))
    const getMapping = () => isTransistor(displayType) ? transistorValues : values;
    const getUpdate = () => isTransistor(displayType) ? setTransistorValues : setValues;
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
                keys={getMapping()}
                style={styles.smTop}
                setItem={(key, val) => getUpdate()((old: any) => ({ ...old, [key]: val }))}
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