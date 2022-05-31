import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { string } from '../../functions/transform';
import styles from './styles';

interface IProps {
    onPress: () => void;
    children?: React.ReactNode;
    label: string;
    style?: ViewStyle;
    txtStyle?: TextStyle;
}

const Clicker: React.FC<IProps> = ({ onPress, children, label, style, txtStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {children ?? <Text style={[styles.text, txtStyle]}>{string(label)}</Text>}
        </TouchableOpacity>
    )
}

export default Clicker;