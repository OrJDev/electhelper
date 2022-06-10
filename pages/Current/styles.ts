import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    currentWrapper: {
        borderWidth: 4,
        borderRadius: 15,
        margin: 5
    },
    currentImg: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    borderedBtn: {
        backgroundColor: undefined,
        borderWidth: 1.5,
        borderColor: 'darkgray'
    },
    center: {
        alignItems: 'center',
    },
    title: {
        ...fonts.h3,
        fontSize: 20,
        margin: 5,
        color: 'gray',
    },
    resistorWrapper: {
        borderWidth: 2,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 15,
        height: 60,
        flexDirection: 'row',
        margin: 3.5,
        width: 400
    },
    spacing: {
        ...fonts.h1,
        color: 'gray'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentItem: {
        textTransform: 'uppercase',
        ...fonts.h2,
        margin: 7
    },
    formWrapper: {
        marginBottom: 25,
        marginTop: 8,
        borderWidth: 2,
        borderColor: 'darkmagenta',
        padding: 5,
        borderRadius: 15,
        alignItems: 'center'
    },
    dType: {
        backgroundColor: 'lightgray',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 8,
    }
})