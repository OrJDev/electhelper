import React from 'react';
import { Text } from 'react-native';
import Clicker from '../Clicker';
import styles from './styles';

interface IProps {
    setValue: (newValue: any) => void;
    values: any[];
    selectedValue: any;
    label: string;
    f?: boolean;
}

const KeysPicker: React.FC<IProps> = ({ values, setValue, label, selectedValue, f }) => {
    return (
        <>
            <Text style={styles.top}>{f ? label : `Choose a ${label}`}</Text>
            {values.map((item, index) => {
                return (
                    <Clicker
                        key={index}
                        style={styles.clicker}
                        onPress={() => setValue(item)}
                        label={item}
                        txtStyle={{ color: selectedValue === item ? 'magenta' : 'black' }}
                    />
                )
            })}
        </>
    )
}

export default KeysPicker;