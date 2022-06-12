import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ArrowBack, Wrapper } from '../../components';
import { SingleFormula } from '../../components/Formula';
import fonts from '../../constants/fonts';
import { solveTwoUnknowns } from '../../functions/math';
import { RootStackScreenProps } from '../../types';
import { IFlows, ItemsToMap } from '../../types/Builder';
import styles from './styles';
interface IProps extends RootStackScreenProps<'CurrentResults'> { }

const CurrentResults: React.FC<IProps> = ({ route, navigation }) => {
    const { formula1, formula2, count, directions } = route.params;
    const [results, setResults] = React.useState<any>(undefined);
    React.useEffect(() => {
        const { first, second } = count;
        let results = solveTwoUnknowns(first.I1, first.I2, first.eq,
            second.I1, second.I2, second.eq
        );
        let newD: any = { ...directions }
        newD.I1 = directions.I1 === 'left' ? 'right' : 'left'
        newD.I2 = directions.I2 === 'left' ? 'right' : 'left'

        setResults({
            I1: { direction: newD.I1, value: results.x },
            I2: { direction: newD.I2, value: results.y }
        });
    }, [])
    return (
        <Wrapper arrow={<ArrowBack onPress={() => navigation.goBack()} />}>
            {results ? <View style={{ alignItems: 'center' }}>
                <View style={styles.formWrapper}>
                    <Text style={styles.txt}>{formula1}</Text>
                    <Text style={styles.txt}>{formula2}</Text>
                    <Ionicons name='arrow-down' size={40} color='black' />
                    {['I1', 'I2'].map((item, index) => {
                        let curr = results[item]
                        return (
                            <View>
                                <SingleFormula
                                    key={index}
                                    formula={`${results[item]?.value ?? 0}`}
                                    onPress={() => true}
                                    sFor={item}
                                />
                                <View style={styles.currWrap}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.currTxt}>{curr.value}</Text>
                                        <Image
                                            style={styles.currImg}
                                            source={
                                                ItemsToMap.find(e => e.key === directions[item as keyof typeof directions])!
                                                    .source
                                            }
                                        />
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.currTxt}>{-1 * curr.value}</Text>
                                        <Image
                                            style={styles.currImg}
                                            source={ItemsToMap.find(e => e.key === results[item].direction)!
                                                .source}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View > :
                <Text style={fonts.h3}>
                    Loading...
                </Text>
            }
        </Wrapper >
    )
}

export default CurrentResults;