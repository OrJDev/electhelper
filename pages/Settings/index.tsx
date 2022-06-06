import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeysPicker, Switch, Wrapper } from '../../components';
import fonts from '../../constants/fonts';
import MContext from '../../context';
import styles from './styles';

interface IProps { }


const Settings: React.FC<IProps> = ({ }) => {
    const { ignoreValues, includeUnits, holdForModal, useLookingFor, dType, lookForValues, possibleKeys } = React.useContext(MContext);
    return (
        <Wrapper>
            <Switch label='Ignore Values I Have' isVisible={ignoreValues.get} setIsVisible={ignoreValues.set} />
            <Switch label='Include Element Units' isVisible={includeUnits.get} setIsVisible={includeUnits.set} />
            <Switch label='Hold Key For Modal' isVisible={holdForModal.get} setIsVisible={holdForModal.set} />
            <Switch label='Search For Specific Values'
                isVisible={useLookingFor.get}
                setIsVisible={useLookingFor.set} />
            {useLookingFor.get ? <>
                <KeysPicker f label='What Formulas Are You Looking For'
                    selectedValue={dType.get}
                    setValue={dType.set}
                    values={['transistor', 'default']} />
                <View style={styles.keyWrapper}>
                    {possibleKeys.map((item, index) => {
                        return <TouchableOpacity style={[styles.keyItem,
                        {
                            backgroundColor: lookForValues.get.includes(item) ? 'gray' : 'lightgray'
                        }]} key={index}
                            onPress={() =>
                                lookForValues[lookForValues.get.includes(item) ? 'remove' : 'add']
                                    (item)
                            }>
                            <Text style={styles.keyItemText}>{item}</Text>
                        </TouchableOpacity>
                    })}
                </View>

            </> : null}
        </Wrapper>
    )
}

export default Settings;