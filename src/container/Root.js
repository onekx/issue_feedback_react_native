import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Admin from './Admin'
import Login from '../pages/account/Login'
import Register from '../pages/account/Register'
import Home from '../pages/home/Home'
import Profile from '../pages/user/Profile'
import SubmitFeedback from '../pages/feedback/SubmitFeedback'
import FeedbackDetails from '../pages/feedback/FeedbackDetails'
import Feedbacks from '../pages/feedback/Feedbacks'

const Stack = createStackNavigator()

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login" headerMode="none">
                <Stack.Screen name="adminNavigation" component={Admin} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="registration" component={Register} />
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="submitFeedback" component={SubmitFeedback} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="feedbackDetails" component={FeedbackDetails} />
                <Stack.Screen name="feedbacks" component={Feedbacks} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
