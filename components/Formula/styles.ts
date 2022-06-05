import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    req: {
        flexDirection: 'row',
        marginTop: 10
    },
    reItem: {
        ...fonts.h2,
        color: 'gray',
        marginRight: 3,
        textTransform: 'uppercase'
    },
    reContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    plus: {
        ...fonts.h3,
        color: 'black'
    },
    center: {
        alignItems: 'center'
    },
    clicker: {
        backgroundColor: undefined, borderWidth: 1, width: 250
    },
    label: {
        ...fonts.h1,
        color: 'black',
        textTransform: 'uppercase'
    }
})