import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/account/Login';
import Register from './src/components/account/Register';
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
