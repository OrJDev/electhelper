import React from 'react';
import { Text, View } from 'react-native';
import { formatFormula } from '../../functions/formulas';
import styles from './styles';

interface IProps {
    formula: string;
}

const Label: React.FC<IProps> = ({ formula }) => {
    return (
        <View style={styles.reContainer}>
            {formula.split(' ').map((item, idx) => {
                let color = /^[a-zA-Z]+$/.test(item) ? 'gray' : 'magenta';
                return <Text key={'label-' + idx} style={[styles.reItem, { color }]}>
                    {formatFormula(item)}
                </Text>
            })}
        </View>
    )
}

export default Label;