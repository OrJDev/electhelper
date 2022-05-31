import React from 'react';
import {
    Modal,
    Animated,
    View,
    ScrollView,
    useWindowDimensions,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import styles from './styles';

interface IProps {
    onDismiss: () => void;
    row?: boolean;
    displayModal: boolean;
}

const ModalContainer: React.FC<IProps> = ({ onDismiss, displayModal, children, row }) => {
    const modelAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const { height } = useWindowDimensions();
    const handleDisplay = (val: boolean) => Animated.timing(modelAnimatedValue, {
        toValue: val ? 1 : 0,
        duration: 500,
        useNativeDriver: false
    }).start();
    React.useEffect(() => handleDisplay(displayModal), [displayModal]);
    const translateY = modelAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [height, height - 600]
    })
    return (
        <Modal
            onRequestClose={onDismiss}
            animationType="fade"
            visible={displayModal}
            transparent
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onDismiss}>
                    <View style={StyleSheet.absoluteFillObject} />
                </TouchableWithoutFeedback>
                <Animated.View style={[styles.wrapper, { top: translateY }]}>
                    <ScrollView
                        contentContainerStyle={{ alignItems: 'center', flexDirection: row ? 'row' : 'column' }}>
                        {children}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default ModalContainer;