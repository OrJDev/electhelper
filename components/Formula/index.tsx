import React from 'react';
import { Text, View } from 'react-native';
import { IForms } from '../../types/Formulas';
import Clicker from '../Clicker';
import Label from './Label';
import Requirements from './Requirements';
import styles from './styles';

interface IProps {
    formulas: IForms[]
}

const Formula: React.FC<IProps> = ({ formulas }) => {
    return (
        <View>
            {formulas.map((item, index) => {
                return <View key={index} style={styles.center}>
                    <Requirements requirements={item.requirements} />
                    {Object.keys(item.formulas).map((formula, formIndex) => {
                        return (
                            <Clicker
                                key={index + '-' + formIndex}
                                label={formula}
                                style={{ ...styles.clicker, ...styles.reContainer }}
                                onPress={() => true}>
                                <Text style={styles.label}>{formula}</Text>
                                <Text style={styles.plus}> = </Text>
                                <Label formula={item.formulas[formula]} />
                            </Clicker>
                        )
                    })}
                </View>
            })}
            {formulas.length > 0 ? <View style={{ height: 100 }} /> : null}
        </View>
    )
}

export default Formula;