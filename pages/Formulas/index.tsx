import React from 'react';
import { ArrowBack, Formula, Wrapper } from '../../components';
import { getFormulas } from '../../functions/formulas';
import { valuesIHave } from '../../functions/values';
import { RootStackScreenProps } from '../../types';
import { IForms } from '../../types/Formulas';
import { IValues } from '../../types/Values';

interface IProps extends RootStackScreenProps<'Formulas'> { }

const Formulas: React.FC<IProps> = ({ route, navigation }) => {
    const [formulas, setFormulas] = React.useState<IForms[]>([]);
    const { currentState } = route.params;
    const variables = React.useMemo<IValues>(() =>
        valuesIHave(currentState) as any, [currentState]);
    React.useEffect(() => {
        const myValuesKeys = Object.keys(variables).map(item => item.toLowerCase())
        setFormulas(getFormulas(myValuesKeys));
    }, [])
    return (
        <Wrapper arrow={<ArrowBack onPress={() => navigation.goBack()} />}>
            {formulas.map((item, id) => <Formula
                item={item}
                key={'f-' + id}
                formulas={formulas}
                last={id === formulas.length - 1}
                onPress={(formula, sFor, sType) => {
                    navigation.navigate('Results', {
                        formula: formula,
                        variables,
                        sFor,
                        sType
                    })
                }}
            />
            )}
        </Wrapper>
    )
}

export default Formulas;