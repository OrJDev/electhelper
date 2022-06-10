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

interface IProps { }


const Current: React.FC<IProps> = ({ }) => {
    const [displayItms, setDisplayItems] = React.useState(false);
    const [current, setCurrent] = React.useState<IFirstSecondKeys>('first');
    const [selectedItems, setSelectedItems] = React.useState<any>({ I2: 'left', I1: 'right' })
    const [displayType, setDisplayType] = React.useState<'voltage' | 'resistor'>('resistor');
    const [flows, setFlows] = React.useState<IFirstSecond>(defaultFirstSecond);
    const [formulas, setFormulas] = React.useState({ first: '', second: '' })

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
            includeCurrents: [],
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
            let f = ke[ke.length - 1].name
                .toLowerCase()
                .replace('u', '').
                replace('r', '')
            return (parseInt(f) + 1);
        }
        return 1;
    }

    React.useEffect(() => {
        let resistors = resolveResistors();
        let voltages = resolveVoltage();
        let exp = `${voltages} = ${resistors}`
        setFormulas(o => ({ ...o, [current]: exp }))
    }, [flows])

    function resolveVoltage() {
        let voltages = flows[current].voltage;
        return voltages.reduce((acc, curr, index) => {
            if (isNaN(curr.value)) return acc;
            if (curr.resisted) {
                return acc + ` ${index === 0 ? '-' : ' - '}${curr.value}`
            }
            if (index !== 0) return acc + ` + ${curr.value}`
            return acc + ` ${curr.value}`;
        }, '')
    }
    function resolveResistors() {
        let tempResistors = ''
        let resistors = flows[current].resistors.filter(e => e.includeCurrents.length);
        for (const element in resistors) {
            let resistor = resistors[element]
            let tmp = resistor.value;
            if (isNaN(tmp)) tmp = 0;
            if (resistor.includeCurrents.length > 1) {
                let action = '+';
                if (selectedItems.I1 == selectedItems.I2) {
                    action = '-'
                }
                tempResistors += `${tmp} (${resistor.includeCurrents[0]} ${action} ${resistor.includeCurrents[1]}) `
            } else {
                tempResistors += ` + ${tmp}${resistor.includeCurrents[0]}`
            }
        }
        return tempResistors;
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
    return (
        <Wrapper
            additionalChildren={
                <View>
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
                                item={item}
                                key={index}
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