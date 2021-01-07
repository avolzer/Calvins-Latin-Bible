import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeHeader() {

    const navigation = useNavigation();

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View>
            <Feather name='menu' size={28} onPress={openMenu}/>
        </View>
    );
};