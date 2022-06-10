import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../components/Logo';
import styles from './styles';

interface IProps {
    arrow?: any;
    onSDisplay?: (val: boolean) => void;
    additionalChildren?: any;
}

const Wrapper: React.FC<IProps> = ({ children, arrow, onSDisplay, additionalChildren }) => {
    return (
        <View style={[{ alignItems: 'center' }, styles.container]}>
            <Logo />
            {arrow}
            {additionalChildren}
            <KeyboardAwareScrollView
                onKeyboardDidHide={() => onSDisplay && onSDisplay(false)}
                onKeyboardDidShow={() => onSDisplay && onSDisplay(true)}
                contentContainerStyle={{ alignItems: 'center' }}>
                {children}
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Wrapper;