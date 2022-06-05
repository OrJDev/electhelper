import { StyleSheet } from 'react-native';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    txt: {
        ...fonts.h3,
        color: 'lightgray'
    },
    switch: {
        width: 33,
        height: 33,
        borderRadius: 60,
    },
    wrapper: {
        width: 115,
        height: 45,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        paddingHorizontal: 5,
        margin: 3,
        borderRadius: 20
    }
})