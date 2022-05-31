import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

interface IProps {
    onPress: () => void;
}

const ArrowBack: React.FC<IProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <AntDesign name='arrowleft' size={30} color='black' />
        </TouchableOpacity>
    )
}

export default ArrowBack;