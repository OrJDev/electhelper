import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    txt: {
        ...fonts.h3,
        color: 'gray'
    },
    keyItem: {
        width: 110,
        height: 50,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 3
    },
    keyItemText: {
        ...fonts.h2, color: 'black', textTransform: 'uppercase'
    },
    keyWrapper: {
        flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'
    }
})