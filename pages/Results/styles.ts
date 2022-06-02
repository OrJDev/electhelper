import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export default StyleSheet.create({
    statusContainer: {
        borderWidth: 1,
        height: 40,
        width: 200,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        color: 'gray',
        ...fonts.h3
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    ways: {
        borderWidth: 2,
        borderColor: 'magenta',
        padding: 5,
        borderRadius: 10
    }
})