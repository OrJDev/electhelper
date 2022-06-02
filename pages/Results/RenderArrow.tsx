import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from './styles';

interface IProps {
    index: number;
    style?: ViewStyle;
    MElement: any;
    len: number;
}

const RenderArrow: React.FC<IProps> = ({ index, style, MElement, len }) => {
    return (
        <View style={style ?? styles.center} key={`arrow-${index}`}>
            {index != len ? <>
                <AntDesign name='arrowdown' size={40} style={{ margin: 5 }} />
                {MElement}
            </> :
                <>
                    {MElement}
                    {index === len - 1 ?
                        null :
                        <AntDesign name='arrowdown' size={40} style={{ margin: 5 }} />
                    }
                </>
            }
        </View >
    )
}

export default RenderArrow;