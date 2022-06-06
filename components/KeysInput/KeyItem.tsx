import React from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { dots, number } from '../../functions/transform';
import ModalContainer from '../ModalContainer';
import styles from './styles';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import MContext from '../../context';

interface IProps {
    item: any;
    setItem: (key: any, newVal: any) => void;
    value: any;
}

const KeyItem: React.FC<IProps> = ({ item, value, setItem }) => {
    const { holdForModal } = React.useContext(MContext)
    const ref = React.createRef<TextInput>();
    const [showFullNum, setShowFullNum] = React.useState(false);
    function toggleFocus(toggle: boolean) {
        if (toggle) {
            ref.current?.focus()
        } else {
            ref.current?.blur()
        }
    }
    return (
        <Pressable
            onPress={() => toggleFocus(true)}
            {...holdForModal.get ? { onLongPress: () => setShowFullNum(true) } : {}}
            style={styles.wrapper}>
            <Text style={styles.text}>{item}</Text>
            <Text style={styles.equals}> = </Text>
            <Text style={styles.value}>{dots(value, 5)}</Text>
            <TextInput
                onEndEditing={() => {
                    // console.log('done')
                    if (!value || value === '') setItem(item, NaN)
                }}
                ref={ref}
                keyboardType='numeric'
                style={styles.input}
                value={isNaN(value) ? undefined : value.toString()}
                onChangeText={val => setItem(item, val)} />
            <ModalContainer
                displayModal={showFullNum}
                onDismiss={() => setShowFullNum(false)}
            >
                <Text style={styles.modalTitle}>{item}</Text>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => toggleFocus(true)}>
                        <MaterialCommunityIcons name='pencil-circle' size={40} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setItem(item, NaN)}>
                        <Ionicons name='remove-circle' size={40} color='black' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.fullVal}>{number(value)}</Text>
            </ModalContainer>
        </Pressable>
    );
}

export default KeyItem;