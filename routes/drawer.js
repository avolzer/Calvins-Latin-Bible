import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../routes/homeStack';
import About from '../routes/aboutStack';
import Settings from '../routes/settingsStack'

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Contents" component={Home} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
        </NavigationContainer>

    );
};
