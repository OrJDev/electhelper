import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

interface IProps { }

const Logo: React.FC<IProps> = ({ }) => {
    return (
        <Text style={styles.text}>
            ElectHelper
        </Text>
    )
}

export default Logo;