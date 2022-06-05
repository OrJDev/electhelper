import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, interpolateColor } from 'react-native-reanimated';
import styles from './styles';


interface IProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<SetStateAction<boolean>>;
    label: string;
}

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const Switch: React.FC<IProps> = ({ setIsVisible, isVisible, label }) => {
    return (
        <>
            <Text style={styles.txt}>{label}</Text>
            <View style={styles.wrapper}>
                <ATouchableOpacity onPress={() => setIsVisible(e => !e)}
                    style={[styles.switch, {
                        backgroundColor: interpolateColor(isVisible ? 1 : 0,
                            [0, 1],
                            ['darkmagenta', 'magenta']),
                        transform: [{ translateX: interpolate(isVisible ? 1 : 0, [0, 1], [0, 70]) }]
                    }]} />
            </View>
        </>

    )
}

export default Switch;