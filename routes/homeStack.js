import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


import Contents from '../screens/toc'
import Reader from '../screens/reader'

const Stack = createStackNavigator();
export default function HomeStack( {navigation} ) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle:{backgroundColor:'#ddd'}
            }}>
                <Stack.Screen
                    name="Calvin's Latin Psalter"
                    component={Contents}
                    
                />
                <Stack.Screen
                    name="Psalm 1"
                    component={Reader}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};