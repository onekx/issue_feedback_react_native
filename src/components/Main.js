import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from './Home';
import Message from './Message';
import User from './User';

const Tab = createBottomTabNavigator()

export default function Main() {
    return(
        <Tab.Navigator initialRouteName="主页">
            <Tab.Screen 
                name="主页" 
                component={Home}
                options={{
                    tabBarLabel: '主页',
                    tabBarIcon: ({ focused }) => {
                        return focused
                        ? <Icon name="home" size={27} color='#2C71FF' /> 
                        : <Icon name="home" size={27} color='#808080' />
                    }
                }}
            />
            <Tab.Screen 
                name="消息"
                component={Message}
                options={{
                    tabBarLabel: '消息',
                    tabBarIcon: ({ focused }) => {
                        return focused
                        ? <Icon name="bells" size={27} color='#2C71FF' /> 
                        : <Icon name="bells" size={27} color='#808080' />
                    }
                }}
            />
            <Tab.Screen
                name="我的"
                component={User}
                options={{
                    tabBarLabel: '我的',
                    tabBarIcon: ({ focused }) => {
                        return focused
                        ? <Icon name="user" size={27} color='#2C71FF' /> 
                        : <Icon name="user" size={27} color='#808080' />
                    }
                }}
            />
        </Tab.Navigator>
    )
}