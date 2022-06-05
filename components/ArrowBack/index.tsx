import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
}

const ArrowBack: React.FC<IProps> = ({ onPress, name, right }) => {
    let x = useSharedValue(0);

    let handlePress = () => x.value = withSequence(
        withTiming(1, { duration: 250, easing: Easing.linear }),
        withSpring(0),
    )

    let animatedStyle = useAnimatedStyle(() => {
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
        <TouchableOpacity style={[styles.container, styles[right ? 'right' : 'left']]} onPress={() => {
            handlePress();
            onPress()
        }}>
            <Animated.View style={[animatedStyle]}>
                <AntDesign name={name ? name as any : 'arrowleft'} size={30} color='black' />

            </Animated.View>
        </TouchableOpacity>
    )
}

export default ArrowBack;