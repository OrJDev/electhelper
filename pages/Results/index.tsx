import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ArrowBack, Wrapper } from '../../components';
import { SingleFormula } from '../../components/Formula';
import fonts from '../../fonts';
import { getUnits, solveFormula } from '../../functions/formulas';
import { string } from '../../functions/transform';
import { RootStackScreenProps } from '../../types';
import styles from './styles';

interface IProps extends RootStackScreenProps<'Results'> { }

const Results: React.FC<IProps> = ({ route, navigation }) => {
    const { variables, formula, sFor } = route.params;
    let [status, setStatus] = React.useState<'calculating' | 'calculated'>('calculating');
    const [results, setResults] = React.useState<[number, string, any[], string]>([0, '', [], ''])
    let ways = [<SingleFormula
        onPress={() => true}
        formula={formula}
        sFor={sFor}
    />, results[2].map((item, index) => {
        return (
            <Text style={[styles.statusText, { fontSize: 20 }]} key={index}>{item}</Text>
        )
    }), <SingleFormula
        onPress={() => true}
        formula={results[1]}
        sFor={sFor}
    />, <SingleFormula
        onPress={() => true}
        formula={`${results[0]} ${results[3]}`}
        sFor={sFor}
    />];
    React.useEffect(() => {
        let res = solveFormula(formula, variables as any);
        setResults([...res, getUnits(sFor) as string])
        setStatus('calculated')
    }, [])
    return (
        <Wrapper arrow={<ArrowBack onPress={() => navigation.goBack()} />}>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>
                    {string(status)}{status === 'calculated' ? '!' : '...'}
                </Text>
            </View>
            {status === 'calculated' ?
                <View style={styles.center}>
                    {ways.map((item, index) => {
                        return (
                            <View key={index} style={[styles.center, { margin: 3 }]}>
                                {index === 0 ?
                                    <>
                                        <AntDesign name='arrowdown' size={40} style={{ margin: 5 }} />
                                        {item}
                                    </> :
                                    <>
                                        {item}
                                        {index === ways.length - 1 ?
                                            null :
                                            <AntDesign name='arrowdown' size={40} style={{ margin: 5 }} />
                                        }
                                    </>}
                            </View>
                        )
                    })}
                </View>
                : null}
        </Wrapper>
    )
}

export default Results;