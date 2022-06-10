import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import fonts from '../../constants/fonts';
import KeyItem from './KeyItem';
import styles from './styles';

interface IProps {
    keys: any;
    setItem: (key: any, newVal: any) => void;
    style?: ViewStyle;
    noHeight?: boolean
    noTxt?: boolean;
}

const KeysInput: React.FC<IProps> = ({ keys, setItem, style, noHeight, noTxt }) => {
    let objectKeys = Object.keys(keys)
    return (
        <View style={[styles.container, style, !noHeight ? { flex: 1 } : {}]}>
            {objectKeys.length ?
                objectKeys.map((item, index) =>
                    <KeyItem
                        setItem={setItem}
                        key={index}
                        value={keys[item]}
                        item={item}
                    />) : <View style={{ alignItems: 'center' }}>
                    {noTxt ? null :
                        <Text style={fonts.h3}>Looks Like There Are No Keys To Input...</Text>

                    }
                </View>}
        </View>

    )
}

export default KeysInput;