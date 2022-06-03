import React from 'react';
import { Text, View } from 'react-native';
import { ArrowBack, Wrapper } from '../../components';
import { SingleFormula } from '../../components/Formula';
import { getUnits } from '../../functions/formulas';
import { solveForm } from '../../functions/math';
import { string } from '../../functions/transform';
import { RootStackScreenProps } from '../../types';
import RenderArrow from './RenderArrow';
import styles from './styles';
import getWays from "../../constants/ways";
interface IProps extends RootStackScreenProps<'Results'> { }

const Results: React.FC<IProps> = ({ route, navigation }) => {
    const { variables, formula, sFor, sType } = route.params;
    let [status, setStatus] = React.useState<'calculating' | 'calculated'>('calculating');
    const [results, setResults] = React.useState<[number, string, any[], string]>([0, '', [], ''])
    let ways = React.useMemo(() => getWays(formula, results), [formula, results, sFor])
    React.useEffect(() => {
        let res = solveForm(formula, variables, sType)
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
                    {ways.map((item, index) => <RenderArrow
                        key={`w-${index}`}
                        MElement={item.myMap ?
                            <View style={[styles.ways, styles.center]} key={`f-${index}`}>
                                {item.myMap}
                            </View> :
                            <SingleFormula
                                key={`t-${index}`}
                                onPress={() => true}
                                formula={item.f}
                                sFor={sFor} />
                        }
                        len={ways.length}
                        index={index}
                        style={{ ...styles.center, margin: 3 }}
                    />
                    )}
                </View>
                : null}
        </Wrapper>
    )
}

export default Results;