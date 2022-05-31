import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface IProps {
    requirements: any[]
}

const Requirements: React.FC<IProps> = ({ requirements }) => {
    return (
        <View style={styles.req}>
            {requirements.map((req, reIndex) => {
                return (
                    <View key={'req-' + reIndex} style={styles.reContainer}>
                        <Text style={styles.reItem}>
                            {req}
                        </Text>
                        {reIndex !== requirements.length - 1 &&
                            <Text style={styles.plus}>
                                +
                            </Text>}
                    </View>
                )
            })}
        </View>
    )
}

export default Requirements;