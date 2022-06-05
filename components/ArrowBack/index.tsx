import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

interface IProps {
    onPress: () => void;
    name?: string;
    right?: boolean;
}

const ArrowBack: React.FC<IProps> = ({ onPress, name, right }) => {
    return (
        <TouchableOpacity style={[styles.container, styles[right ? 'right' : 'left']]} onPress={onPress}>
            <AntDesign name={name ? name as any : 'arrowleft'} size={30} color='black' />
        </TouchableOpacity>
    )
}

export default ArrowBack;