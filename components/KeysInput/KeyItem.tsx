import React from 'react';
import { Pressable, Text, TextInput, TouchableOpacity } from 'react-native';
import { dots, number } from '../../functions/transform';
import ModalContainer from '../ModalContainer';
import styles from './styles';

interface IProps {
    item: any;
    setItem: (key: any, newVal: any) => void;
    value: any;
}

const KeyItem: React.FC<IProps> = ({ item, value, setItem }) => {
    const ref = React.createRef<TextInput>();
    const [showFullNum, setShowFullNum] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    function toggleFocus(toggle: boolean) {
        if (toggle) {
            setFocused(true)
            ref.current?.focus()
        } else {
            setFocused(false);
            ref.current?.blur()
        }
    }
    return (
        <Pressable
            onLongPress={() => setShowFullNum(true)}
            style={styles.wrapper} onPress={() => toggleFocus(!focused)}>
            <Text style={styles.text}>{item}</Text>
            <Text style={styles.equals}> = </Text>
            <Text style={styles.value}>{dots(value, 4)}</Text>
            <TextInput
                onEndEditing={() => !value || value === '' && setItem(item, 0)}
                ref={ref}
                keyboardType='numeric'
                style={styles.input}
                value={!isNaN(value) ? value.toString() : undefined}
                onChangeText={val => setItem(item, val)} />
            <ModalContainer
                displayModal={showFullNum}
                onDismiss={() => setShowFullNum(false)}
            >
                <Text style={styles.modalTitle}>{item}</Text>
                <TouchableOpacity onPress={() => toggleFocus(true)}>
                    <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>
                <Text style={styles.fullVal}>{number(value)}</Text>
            </ModalContainer>
        </Pressable>
    );
}

export default KeyItem;