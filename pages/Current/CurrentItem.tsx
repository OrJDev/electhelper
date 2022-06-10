import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface IProps {
    source: any;
    isSelected: boolean;
    onPress: () => void;
}

const CurrentItem: React.FC<IProps> = ({ source, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.currentWrapper, { borderColor: isSelected ? 'darkmagenta' : 'lightgray' }]}>
            <Image
                source={source}
                style={styles.currentImg}
            />
        </TouchableOpacity>
    )
}

export default CurrentItem;