import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Switch, Wrapper } from '../../components';
import MContext from '../../context';
import styles from './styles';

interface IProps { }


const Settings: React.FC<IProps> = ({ }) => {
    const { ignoreValues, includeUnits, holdForModal } = React.useContext(MContext);
    return (
        <Wrapper>
            <Switch label='Ignore Values I Have' isVisible={ignoreValues.get} setIsVisible={ignoreValues.set} />
            <Switch label='Include Element Units' isVisible={includeUnits.get} setIsVisible={includeUnits.set} />
            <Switch label='Hold Key For Modal' isVisible={holdForModal.get} setIsVisible={holdForModal.set} />
        </Wrapper>
    )
}

export default Settings;