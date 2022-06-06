import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface IProps {
    requirements: any[];
    title?: string;
}

const Requirements: React.FC<IProps> = ({ requirements, title }) => {
    return (
        <View style={styles.req}>
            {requirements.map((req, reIndex) => {
                return (
                    <View key={'req-' + reIndex} style={styles.reContainer}>
                        <Text style={styles.reItem}>
                            {req}
                        </Text>
                        {reIndex !== requirements.length - 1 ?
                            <Text style={styles.plus}>
                                +
                            </Text> : <>
                                <Text style={styles.plus}>(</Text>
                                <Text style={[styles.reItem, { color: 'magenta' }]}>{title}</Text>
                                <Text style={styles.plus}>)</Text>
                            </>}
                    </View>
                )
            })}
        </View>
    )
}

export default Requirements;