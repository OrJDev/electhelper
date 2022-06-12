import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    formWrapper: {
        marginTop: 25,
        alignItems: 'center',
        width: '100%'
    },
    txt: {
        ...fonts.h2,
        margin: 3
    },
    currImg: {
        width: 150,
        height: 150,
        marginTop: -20,
        resizeMode: 'contain'
    },
    currTxt: {
        ...fonts.h3,
        fontSize: 20,
        marginTop: 5
    },
    currWrap: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
})