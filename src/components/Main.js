import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Message from './Message';
import User from './User';

const Tab = createBottomTabNavigator()

export default function Main() {
    return(
        <Tab.Navigator initialRouteName="消息">
            <Tab.Screen name="消息" component={Message} />
            <Tab.Screen name="我" component={User} />
        </Tab.Navigator>
    )
}