import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Home } from './pages';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Group screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}>
                <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
