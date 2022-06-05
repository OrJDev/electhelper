import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        backgroundColor: 'magenta',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        padding: 3
    },
    text: {
        ...fonts.h3,
        color: 'white',
    }
})