import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Switch, Wrapper } from '../../components';
import MContext from '../../context';
import styles from './styles';

interface IProps { }


const Settings: React.FC<IProps> = ({ }) => {
    const { ignoreValues, setIgnoreValues } = React.useContext(MContext);
    return (
        <Wrapper>
            <Switch label='Ignore Values I Have' isVisible={ignoreValues} setIsVisible={setIgnoreValues} />
        </Wrapper>
    )
}

export default Settings;