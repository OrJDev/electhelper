import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowBack, Wrapper } from '../../components';
import fonts from '../../constants/fonts';
import CurrentItem from './CurrentItem';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListItem from './ListItem';
import { string } from '../../functions/transform';
import {
    defaultFirstSecond,
    IFirstSecondKeys,
    IFirstSecond,
    IResistor,
    IVoltage,
    Currents,
    ItemsToMap
} from '../../types/Builder';
import { useNavigation } from '@react-navigation/native';
interface IProps { }

export const sortList = (list: any[]) => list.sort((a, b) => formatName(a.name) - formatName(b.name));
export const formatName = (mName?: string) => parseInt(
    mName?.toLowerCase().replace('u', '').replace('r', '').replace('i', '')
    ?? '0'
);
const defaultCount = {
    first: {
        I1: 0,
        I2: 0,
        eq: 0
    },
    second: {
        I1: 0,
        I2: 0,
        eq: 0
    }
}
const Current: React.FC<IProps> = ({ }) => {
    const [displayItms, setDisplayItems] = React.useState(false);
    const [current, setCurrent] = React.useState<IFirstSecondKeys>('first');
    const [selectedItems, setSelectedItems] = React.useState<any>({ I2: 'left', I1: 'right' })
    const [displayType, setDisplayType] = React.useState<'voltage' | 'resistor'>('resistor');
    const [flows, setFlows] = React.useState<IFirstSecond>(defaultFirstSecond);
    const [formulas, setFormulas] = React.useState({ first: '', second: '' })
    const [count, setCount] = React.useState(defaultCount)
    const navigation = useNavigation();
    function Picker({ onChange, currentItm, items }:
        { onChange: (item: any) => void; currentItm: any; items: any[] }) {
        return <View style={styles.row}>
            {items.map((item, index) => {
                return <TouchableOpacity
                    onPress={() => onChange(item)}
                    key={index}
                    style={[styles.dType,
                    { backgroundColor: currentItm === item ? 'gray' : 'lightgray' }]}>
                    <Text style={fonts.h3}>{string(item)}</Text>
                </TouchableOpacity>
            })}
        </View>
    }
    function createResistor() {
        let id = getId(flows[current].resistors)
        let newObj: IResistor = {
            name: `R${id}`,
            includeCurrents: [current === 'first' ? 'I1' : 'I2'],
            value: NaN
        }
        setFlows(f => ({
            ...f, [current]: {
                ...f[current],
                resistors:
                    [...f[current].resistors, newObj]
            }
        }))
        setDisplayType('resistor')
    }
    function createVoltage() {
        let id = getId(flows[current].voltage)
        let newObj: IVoltage = {
            name: `U${id}`,
            value: NaN,
            resisted: false
        }
        setFlows(f => ({
            ...f, [current]: {
                ...f[current],
                voltage:
                    [...f[current].voltage, newObj]
            }
        }))
        setDisplayType('voltage')
    }


    function getId(ke: any[]): number {
        if (ke.length) {
            let f = formatName(ke[ke.length - 1].name)
            return (f + 1);
        }
        return 1;
    }

    React.useEffect(() => {
        let resistors = resolveResistors();
        let voltages = resolveVoltage();
        let exp = `${voltages} = ${resistors}`
        setFormulas(o => ({ ...o, [current]: exp }))
        setCount(e => ({ ...e, [current]: resolveMap() }))
    }, [flows, selectedItems])

    function resolveMap() {
        let map = { I1: 0, I2: 0 }
        for (const element of flows[current].resistors.filter(e => !isNaN(e.value))) {
            element.includeCurrents.forEach((item, index) => {
                if (index === 1 && selectedItems.I1 === selectedItems.I2) {
                    map[item] -= parseFloat(element.value as any)
                } else {
                    map[item] += parseFloat(element.value as any);
                }
            })
        }
        let eq = flows[current].voltage.reduce((acc, curr) => acc + parseFloat(curr.value as any), 0)
        return { ...map, eq }
    }

    function resolveVoltage() {
        let voltages = flows[current].voltage;
        return voltages.filter(e => !isNaN(e.value))
            .reduce((acc, curr, index) => {
                if (curr.resisted) {
                    return acc + ` ${index === 0 ? '-' : ' - '}${curr.value}`
                }
                if (index !== 0) return acc + ` + ${curr.value}`
                return acc + ` ${curr.value}`;
            }, '')
    }
    function resolveResistors() {
        return flows[current].resistors.
            filter(e => e.includeCurrents.length)
            .reduce((acc, curr, index) => {
                let tmp = curr.value;
                if (isNaN(tmp)) tmp = 0;
                let beingLine = index === 0 ? '' : tmp >= 0 ? ' + ' : '';
                if (curr.includeCurrents.length > 1) {
                    let action = selectedItems.I1 === selectedItems.I2 ? '-' : '+'
                    let [first, second] = curr.includeCurrents;
                    return acc + `${beingLine}${tmp}(${first} ${action} ${second})`
                } else {
                    return acc + `${beingLine}${tmp}${curr.includeCurrents[0]}`
                }
            }, '')
    }


    const anyKeys = (isAny?: boolean) => {
        let { resistors, voltage } = flows[current];
        if (isAny) {
            return resistors.length || voltage.length;
        } else {
            if (displayType === 'resistor') return resistors.length;
            return voltage.length;
        }
    }
    const canBePressed = count.first.eq > 0 && count.second.eq > 0 && (
        count.second.I1 > 0
        ||
        count.first.I1 > 0
        ||
        count.second.I2 > 0
        ||
        count.first.I2 > 0
    )
    return (
        <Wrapper
            additionalChildren={
                <View style={{ alignItems: 'center' }}>
                    <Picker items={['first', 'second']} onChange={setCurrent} currentItm={current} />
                    <Picker items={['voltage', 'resistor']} onChange={setDisplayType} currentItm={displayType} />
                    {formulas[current].length ? <View style={styles.formWrapper}>
                        <Text style={fonts.h2}>{formulas[current]}</Text>
                    </View> : null}
                </View>
            }
            arrow={<>
                <ArrowBack
                    size={25}
                    MIcon={<MaterialCommunityIcons name='resistor' size={30} color='black' />}
                    right
                    onPress={createResistor}
                />
                <ArrowBack
                    right
                    style={{ top: 80 }}
                    onPress={createVoltage}
                    MIcon={<MaterialCommunityIcons name='power-plug' size={30} color='black' />}
                />
                <ArrowBack
                    name={displayItms ? 'close' : 'shrink'}
                    size={25}
                    noAnimation
                    onPress={() => setDisplayItems(e => !e)}
                />
                {canBePressed ? <ArrowBack
                    name='check'
                    size={25}
                    style={{ top: 80 }}
                    noAnimation
                    onPress={() => navigation.navigate('CurrentResults',
                        {
                            formula1: formulas.first,
                            formula2: formulas.second,
                            count,
                            directions: selectedItems
                        })}
                /> : null}

            </>}>
            {displayItms ? (<>
                {Currents.map((itm, idx) => {
                    return <View key={idx} style={styles.center}>
                        <Text style={fonts.h1}>{itm}</Text>
                        <View style={styles.row}>
                            {ItemsToMap.map((item, index) => {
                                return <CurrentItem
                                    key={index}
                                    isSelected={selectedItems[itm] === item.key}
                                    source={item.source}
                                    onPress={() =>
                                        setSelectedItems((prev: any) => ({ ...prev, [itm]: item.key }))
                                    }
                                />
                            })}
                        </View>
                    </View>
                })}
            </>) : anyKeys(false) ?
                <>
                    {flows[current][displayType === 'resistor' ? 'resistors' : 'voltage'].
                        map((item, index) => (
                            <ListItem
                                key={index}
                                item={item}
                                setResist={setFlows}
                                type={current}
                                elKey={displayType === 'resistor' ? 'resistors' : 'voltage'}
                            />
                        ))}
                </>
                : <>

                    <Text style={fonts.h3}>Looks Like There Are No Keys To Input...</Text>
                </>}
        </Wrapper>
    )
}

export default Current;