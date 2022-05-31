import React from 'react';
import { View, ViewStyle } from 'react-native';
import KeyItem from './KeyItem';
import styles from './styles';

interface IProps {
    keys: any;
    setItem: (key: any, newVal: any) => void;
    style?: ViewStyle;
}

const KeysInput: React.FC<IProps> = ({ keys, setItem, style }) => {
    return (
        <View style={[styles.container, style]}>
            {Object.keys(keys).map((item, index) =>
                <KeyItem
                    setItem={setItem}
                    key={index}
                    value={keys[item]}
                    item={item}
                />)}
        </View>

    )
}

export default KeysInput;