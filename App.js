import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './src/components/account/Login'
import Register from './src/components/account/Register'
import Home from './src/components/user/Home'
import SubmitFeedback from './src/components/user/SubmitFeedback'
import Admin from './src/components/admin/Admin'
import Profile from './src/components/user/Profile'

const Stack = createStackNavigator()

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="登录" headerMode="none">
                <Stack.Screen name="登录" component={Login} />
                <Stack.Screen name="注册" component={Register} />
                <Stack.Screen name="主页" component={Home} />
                <Stack.Screen name="提交反馈" component={SubmitFeedback} />
                <Stack.Screen name="后台管理" component={Admin} />
                <Stack.Screen name="个人资料" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
  )
}
