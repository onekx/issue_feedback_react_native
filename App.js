import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/account/Login';
import Register from './src/components/account/Register';
import Main from './src/components/Main';
import Admin from './src/components/admin/Admin'

const Stack = createStackNavigator()

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="登录" headerMode="none">
                <Stack.Screen name="登录" component={Login} />
                <Stack.Screen name="注册" component={Register} />
                <Stack.Screen name="主界面" component={Main} />
                <Stack.Screen name="后台管理" component={Admin} />
            </Stack.Navigator>
        </NavigationContainer>
  )
}
