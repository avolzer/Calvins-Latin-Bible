import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


import Contents from '../screens/toc'
import Reader from '../screens/reader'
import Search from '../screens/search'
import Header from '../shared/header'

const Stack = createStackNavigator();
export default function HomeStack( {navigation} ) {
    return (
       
            <Stack.Navigator screenOptions={{
                headerStyle:{backgroundColor:'#ddd'}
            }}>
                <Stack.Screen
                    name="Calvin's Latin Psalter"
                    component={Contents}
                    options={{
                        headerRight: () =>  <Header navigation={navigation} />
                    }}
                />
                <Stack.Screen
                    name="Reader"
                    component={Reader}
                />
                <Stack.Screen
                    name="Search"
                    component={Search}
                />
            </Stack.Navigator>
      
    );
};