import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../components/Logo';
import styles from './styles';

interface IProps {
    arrow?: any;
}

const Wrapper: React.FC<IProps> = ({ children, arrow }) => {
    return (
        <View style={[{ alignItems: 'center' }, styles.container]}>
            <Logo />
            {arrow}
            <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
                {children}
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Wrapper;