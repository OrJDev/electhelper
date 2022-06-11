import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { CurrentResults, Formulas, Results } from '../pages';
import { RootStackParamList } from '../types';
import TabsNavigator from './TabsNavigator';

interface IProps { }

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC<IProps> = ({ }) => {
    return (
        <Stack.Navigator initialRouteName='Tabs'>
            <Stack.Group screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}>
                <Stack.Screen name="Tabs" component={TabsNavigator} />
                <Stack.Screen name="Results" component={Results} />
                <Stack.Screen name="CurrentResults" component={CurrentResults} />
                <Stack.Screen name="Formulas" component={Formulas} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default Navigation;
