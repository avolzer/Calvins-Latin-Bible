import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Text } from 'react-native'


import Contents from '../screens/toc'
import Reader from '../screens/reader'
import Search from '../screens/search'
import HomeHeader from '../shared/homeHeader'
import DrawerHeader from '../shared/drawerHeader'

const Stack = createStackNavigator();
export default function HomeStack( {navigation} ) {
    
    function headerText (){
        if (global.language== "English") {
            return "Calvin's Latin Psalter"
        }
        else{
            return "Psalmi Ab Iohanne Calvini"}
        }
    return (
       
            <Stack.Navigator screenOptions={{
                headerStyle:{backgroundColor:'#ddd'}
            }}>
                <Stack.Screen
                    name="Calvin's Latin Psalter"
                    component={Contents}
                    options={{
                        headerRight: () =>  <HomeHeader navigation={navigation} />,
                        headerLeft: () =>  <DrawerHeader navigation={navigation} />,
                        headerTitle: headerText()
                    }
                }
                />
                <Stack.Screen
                    name="Reader"
                    component={Reader}
                    options={{
                        headerRight: () =>  <HomeHeader navigation={navigation} />,
                        
                    }}
                    options={({ route }) => ({ title: route.params.name })}
                />
                <Stack.Screen
                    name="Search"
                    component={Search}
                />
            </Stack.Navigator>
      
    );
};