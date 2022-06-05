import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import fonts from '../../constants/fonts';
import KeyItem from './KeyItem';
import styles from './styles';

interface IProps {
    keys: any;
    setItem: (key: any, newVal: any) => void;
    style?: ViewStyle;
}

const KeysInput: React.FC<IProps> = ({ keys, setItem, style }) => {
    let objectKeys = Object.keys(keys)
    return (
        <View style={[styles.container, style]}>
            {objectKeys.length ? objectKeys.map((item, index) =>
                <KeyItem
                    setItem={setItem}
                    key={index}
                    value={keys[item]}
                    item={item}
                />) : <Text style={{ ...fonts.h1, padding: 10 }}>No Keys To Input</Text>}
        </View>

    )
}

export default KeysInput;