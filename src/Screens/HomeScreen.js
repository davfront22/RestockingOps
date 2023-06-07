import React from 'react'
import { Text, View, StyleSheet, DrawerLayoutAndroid } from 'react-native'
import { Icon } from 'react-native-elements';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HelpScreen from './HelpScreen';
import ViewMachine from './ViewMachine';
import MapScreen from './MapScreen';
import OrdersScreen from './OrdersScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen({route}) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            type="material-community"
                            name={"cart"}
                            size={size}
                            color={focused ? "blue" : color}
                        />
                    ),
                    tabBarColor: 'green',
                    tabBarActiveTintColor: 'blue',
                }}
            />
            <Tab.Screen
                name="Machines"
                component={ViewMachine}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            type="material-community"
                            name={"glass-stange"}
                            size={size}
                            color={focused ? "blue" : color}
                        />
                    ),
                    tabBarActiveTintColor: 'blue',
                }}

            />
            <Tab.Screen
                name="Navigate"
                component={MapScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            type="material-community"
                            name={"map"}
                            size={size}
                            color={focused ? "blue" : color}
                        />
                    ),
                    tabBarActiveTintColor: 'blue',
                }}

            />
            <Tab.Screen
                name="Help"
                component={HelpScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            type="material-community"
                            name={"help-circle-outline"} // Cambia el nombre del icono según el estado del foco
                            size={size}
                            color={focused ? "blue" : color} // Cambia el color del icono según el estado del foco
                        />
                    ),
                    tabBarColor: '#506176',
                    tabBarActiveTintColor: 'blue',
                }}
            />
        </Tab.Navigator>
    )
}