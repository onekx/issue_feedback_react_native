import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Home from './src/components/Home';
import Message from './src/components/Message';
import User from './src/components/User';
import Main from './src/components/Main';

const Stack = createStackNavigator()

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="登录" headerMode="none">
                <Stack.Screen name="登录" component={Login} />
                <Stack.Screen name="注册" component={Register} />
                <Stack.Screen name="主界面" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
  )
}
