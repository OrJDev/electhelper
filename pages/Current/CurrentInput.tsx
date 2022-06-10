import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ModalContainer } from '../../components';
import styles from '../../components/KeysInput/styles';
import MContext from '../../context';
import { dots, number } from '../../functions/transform';

interface IProps {
    value: any;
    onChange: (newVal: any) => void;
    title: string;
    style?: ViewStyle;
}

const CurrentInput: React.FC<IProps> = ({ value, onChange, title, style }) => {
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
            style={[styles.wrapper, { width: 125 }, style]}>
            <Text style={styles.value}>{dots(value, 5)}</Text>
            <TextInput
                onEndEditing={() => {
                    // console.log('done')
                    if (!value || value === '') onChange(NaN)
                }}
                ref={ref}
                keyboardType='numeric'
                style={styles.input}
                value={isNaN(value) ? undefined : value.toString()}
                onChangeText={val => onChange(val)} />
            <ModalContainer
                displayModal={showFullNum}
                onDismiss={() => setShowFullNum(false)}
            >
                <Text style={styles.modalTitle}>{title}</Text>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => toggleFocus(true)}>
                        <MaterialCommunityIcons name='pencil-circle' size={40} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChange(NaN)}>
                        <Ionicons name='remove-circle' size={40} color='black' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.fullVal}>{number(value)}</Text>
            </ModalContainer>
        </Pressable>
    )
}

export default CurrentInput;