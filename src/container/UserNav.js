import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'
import Home from '../pages/home/Home'
import User from '../pages/user/User'

const Tab = createBottomTabNavigator()

const UserNav = () => {
    return (
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

export default UserNav
