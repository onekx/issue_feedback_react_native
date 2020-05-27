import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import SubmitFeedback from './SubmitFeedback'

const Stack = createStackNavigator()

export default function Main() {
    return(
        <Stack.Navigator initialRouteName="首页" headerMode="none">
            <Stack.Screen name="首页" component={Home} />
            <Stack.Screen name="提交反馈" component={SubmitFeedback} />
        </Stack.Navigator>
    )
}