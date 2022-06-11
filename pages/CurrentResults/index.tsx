import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ArrowBack, Wrapper } from '../../components';
import fonts from '../../constants/fonts';
import { solveTwoUnknowns } from '../../functions/math';
import { RootStackScreenProps } from '../../types';

interface IProps extends RootStackScreenProps<'CurrentResults'> { }

const CurrentResults: React.FC<IProps> = ({ route, navigation }) => {
    const { formula1, formula2, count } = route.params;
    const [results, setResults] = React.useState<any>(undefined);
    React.useEffect(() => {
        const { first, second } = count;
        let results = solveTwoUnknowns(first.I1, first.I2, first.eq,
            second.I1, second.I2, second.eq
        );
        setResults({ I1: results.x.toFixed(3), I2: results.y.toFixed(3) });
    }, [])
    return (
        <Wrapper arrow={<ArrowBack onPress={() => navigation.goBack()} />}>
            {results ? <View style={{ alignItems: 'center' }}>
                <View style={{ marginTop: 25, alignItems: 'center', width: '100%' }}>
                    <Text style={{ ...fonts.h2, margin: 3 }}>{formula1}</Text>
                    <Text style={{ ...fonts.h2, margin: 3 }}>{formula2}</Text>
                    <Ionicons name='arrow-down' size={40} color='black' />
                    <Text style={{ ...fonts.h2, margin: 3 }}>I1 = {results.I1}A (Ampere)</Text>
                    <Text style={{ ...fonts.h2, margin: 3 }}>I2 = {results.I2}A (Ampere)</Text>
                </View>
            </View > :
                <Text style={fonts.h3}>
                    {`Loading...`}
                </Text>
            }
        </Wrapper >
    )
}

export default CurrentResults;