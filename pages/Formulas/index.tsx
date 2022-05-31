import React from 'react';
import { ArrowBack, Formula, Wrapper } from '../../components';
import { getFormulas } from '../../functions/formulas';
import { valuesIHave } from '../../functions/values';
import { RootStackScreenProps } from '../../types';
import { IForms } from '../../types/Formulas';

interface IProps extends RootStackScreenProps<'Formulas'> { }

const Formulas: React.FC<IProps> = ({ route, navigation }) => {
    const [formulas, setFormulas] = React.useState<IForms[]>([]);
    const { currentSate } = route.params;
    React.useEffect(() => {
        const myValues = valuesIHave(currentSate)
        const myValuesKeys = Object.keys(myValues).map(item => item.toLowerCase())
        setFormulas(getFormulas(myValuesKeys));
    }, [])
    return (
        <Wrapper arrow={<ArrowBack onPress={() => navigation.goBack()} />}>
            <Formula formulas={formulas} />
        </Wrapper>
    )
}

export default Formulas;