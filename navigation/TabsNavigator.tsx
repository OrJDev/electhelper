import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home, Settings } from '../pages';
import { RootTabParamList } from "../types";
import styles from './styles';

interface IProps { }

const Tabs = createBottomTabNavigator<RootTabParamList>();

const TabsNavigator: React.FC<IProps> = ({ }) => {
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'magenta',
            tabBarInactiveTintColor: 'darkmagenta',
            tabBarShowLabel: false,
            tabBarStyle: styles.TabBar,
            tabBarLabelStyle: { paddingBottom: 3 },
        }}>
            <Tabs.Screen options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Entypo
                        color={color} size={focused ? size * 1.5 : size * 1.2}
                        name="home" />)
            }}
                name="Home"
                component={Home}
            />
            <Tabs.Screen options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <MaterialIcons color={color} size={focused ? size * 1.5 : size * 1.2}
                        name="settings" />)
            }}
                name="Settings"
                component={Settings}
            />
        </Tabs.Navigator>
    )
}

export default TabsNavigator;