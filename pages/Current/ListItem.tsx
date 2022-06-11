import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import fonts from '../../constants/fonts';
import { IFirstSecond, IFirstSecondKeys } from '../../types/Builder';
import CurrentInput from './CurrentInput';
import { Currents, IResistor, IVoltage } from '../../types/Builder';
import styles from './styles';

export interface IProps {
    item: IResistor | IVoltage
    setResist: React.Dispatch<React.SetStateAction<IFirstSecond>>;
    type: IFirstSecondKeys;
    elKey: 'resistors' | 'voltage';
}

const Resistor: React.FC<IProps> = ({ item, setResist, type, elKey }) => {
    function handleEditor(item: any, current: any) {
        if (isVoltage(item)) {
            setResist(e => ({
                ...e, [type]: {
                    ...e[type],
                    voltage: [...e[type].voltage.filter(e => e.name !== item.name),
                    { ...item, resisted: !item.resisted }]
                }
            }))
        } else {
            setResist(e => ({
                ...e, [type]: {
                    ...e[type],
                    resistors: [...e[type].resistors.filter(e => e.name !== item.name),
                    {
                        ...item,
                        includeCurrents: item.includeCurrents.includes(current) ?
                            item.includeCurrents.filter((e: any) => e !== current)
                            :
                            [...item.includeCurrents, current]
                    }
                    ]
                }
            }))

        }
    }

    const isVoltage = (item: IVoltage | IResistor): item is IVoltage => 'resisted' in item;

    function RCElement({ itmKey, element }: { itmKey: any, element: any }) {
        let isEqualOrInclude: boolean;
        if (Array.isArray(item[itmKey as keyof typeof item])) {
            isEqualOrInclude = (item[itmKey as keyof typeof item] as any).includes(element)
        } else {
            if (typeof item[itmKey as keyof typeof item] === 'boolean') {
                isEqualOrInclude = item[itmKey as keyof typeof item] as any as boolean
            } else {
                isEqualOrInclude = item[itmKey as keyof typeof item] === element
            }
        }
        return <View
            style={styles.rowCenter}>
            <TouchableOpacity onPress={() => handleEditor(item, element)}>
                <Text style={[styles.currentItem, {
                    color: isEqualOrInclude ? 'magenta' : 'darkmagenta'
                }]}>
                    {element}
                </Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={styles.resistorWrapper}>
            <Text style={fonts.h1}>{item.name}</Text>
            {<View style={styles.rowCenter}>
                <Text style={styles.spacing}> | </Text>
                {(isVoltage(item) ? ['Resisted'] : Currents).map((itm, index) => {
                    return <RCElement
                        itmKey={!isVoltage(item) ? 'includeCurrents' : 'resisted'}
                        key={index}
                        element={itm}
                    />
                })}
            </View>}
            <Text style={styles.spacing}> | </Text>
            <CurrentInput
                value={item.value}
                style={{ width: 90 }}
                title={item.name}
                onChange={(newVal) => {
                    setResist(e => ({
                        ...e, [type]: {
                            ...e[type], [elKey]:
                                [...(e[type][elKey] as any[]).filter(e => e.name !== item.name),
                                { ...item, value: newVal }
                                ]
                        }
                    }))
                }}
            />
            <Text style={styles.spacing}> | </Text>
            <TouchableOpacity onPress={() => {
                setResist(e => ({
                    ...e, [type]:
                    {
                        ...e[type],
                        [elKey]: ((e[type][elKey]) as any).filter((e: any) => e.name !== item.name)
                    }
                }))
            }}>
                <MaterialCommunityIcons name='close' color='red' size={30} />
            </TouchableOpacity>
        </View>
    )
}

export default Resistor;