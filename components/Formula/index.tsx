import React from 'react';
import { Text, View } from 'react-native';
import { formatFormula } from '../../functions/formulas';
import { IForms, IFormType } from '../../types/Formulas';
import Clicker from '../Clicker';
import Label from './Label';
import Requirements from './Requirements';
import styles from './styles';

interface IProps {
    formulas: IForms[];
    onPress: (form: string, sFor: string, sType: IFormType) => void;
    item: IForms;
    last: boolean;
    title?: string;
}
interface ISingleProps {
    sFor: string;
    onPress: () => void;
    formula: string;
}
export const SingleFormula = ({ sFor, onPress, formula }: ISingleProps) => {
    return (
        <Clicker
            label={sFor}
            style={{ ...styles.clicker, ...styles.reContainer, minWidth: 375 }}
            onPress={onPress}>
            <Text style={styles.label}>{sFor}</Text>
            <Text style={styles.plus}> = </Text>
            <Label formula={formula} />
        </Clicker>
    )
}
const Formula: React.FC<IProps> = ({ onPress, item, last, formulas, title }) => {
    return (
        <View style={styles.center}>
            <Requirements title={title} requirements={item.requirements} />
            {Object.keys(item.formulas).map((formula, formIndex) => {
                return (
                    <SingleFormula
                        key={'form-' + formIndex}
                        formula={formatFormula(item.formulas[formula], true)}
                        sFor={formula}
                        onPress={() => onPress(item.formulas[formula], formula, item.type)} />
                )
            })}
            {(formulas.length > 0 && last) ? <View style={{ height: 100 }} /> : null}
        </View >
    )
}

export default Formula;