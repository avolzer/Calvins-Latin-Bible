import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


import Contents from '../screens/toc'
import Settings from '../screens/settings'
import Header from '../shared/header'

const Stack = createStackNavigator();
export default function HomeStack( {navigation} ) {
    return (
        
            <Stack.Navigator screenOptions={{
                headerStyle:{backgroundColor:'#ddd'}
            }}>
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                   
                />
               
            </Stack.Navigator>
        
    );
};