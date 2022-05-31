import { StyleSheet } from 'react-native';
import fonts from '../../fonts';

export default StyleSheet.create({
    clicker: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 30,
        backgroundColor: undefined,
    },
    top: {
        marginTop: 5,
        color: 'darkgray',
        ...fonts.h3
    }
})