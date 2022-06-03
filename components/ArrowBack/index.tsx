import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

interface IProps {
    onPress: () => void;
    name?: string;
}

const ArrowBack: React.FC<IProps> = ({ onPress, name }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <AntDesign name={name ? name as any : 'arrowleft'} size={30} color='black' />
        </TouchableOpacity>
    )
}

export default ArrowBack;