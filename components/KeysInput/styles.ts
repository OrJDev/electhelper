import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    wrapper: {
        width: 180,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 3,
        borderRadius: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0
    },
    text: {
        ...fonts.h2,
        textTransform: 'uppercase'
    },
    equals: {
        ...fonts.h3,
        color: 'lightgray',
    },
    value: {
        ...fonts.h2,
        color: 'gray'
    },
    fullVal: {
        ...fonts.h1,
        color: 'magenta'
    },
    modalTitle: {
        ...fonts.h1,
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
        margin: 5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    }
})