import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'
import Main from './Main'
import User from './User'

const Tab = createBottomTabNavigator()

export default function BottomTab() {
    return(
        <Tab.Navigator initialRouteName="主页">
            <Tab.Screen 
                name="主页" 
                component={Main}
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