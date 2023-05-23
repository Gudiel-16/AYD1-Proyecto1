import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import Screen from '../components/screen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (

        <Stack.Navigator initialRouteName="LoginScreen">

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name="Screen"
                component={Screen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
}

export default StackNavigator;