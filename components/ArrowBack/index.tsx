import exp, { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated'
interface IProps {
    onPress: () => void;
    name?: string;
    right?: boolean;
    size?: number;
    noAnimation?: boolean;
    style?: ViewStyle;
    MIcon?: any;
}

const ArrowBack: React.FC<IProps> = ({ onPress, name, right, size, noAnimation, style, MIcon }) => {
    let x = useSharedValue(0);
    let handlePress = () => x.value = withSequence(
        withTiming(1, { duration: 250, easing: Easing.linear }),
        withSpring(0),
    )

    let animatedStyle = noAnimation ? {} : useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(x.value,
                        [0, 0.75, 1],
                        [0, Math.PI * 2.5, -Math.PI * 2.5])
                }
            ]
        }
    })
    return (
        <TouchableOpacity style={[styles.container, styles[right ? 'right' : 'left'], style]} onPress={() => {
            handlePress();
            onPress()
        }}>
            <Animated.View style={[animatedStyle]}>
                {MIcon ??
                    <AntDesign
                        name={name ? name as any : 'arrowleft'}
                        size={size ?? 30}
                        color='black' />
                }
            </Animated.View>
        </TouchableOpacity>
    )
}

export default ArrowBack;