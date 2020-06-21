import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Admin from './Admin'
import UserNav from './UserNav'
import Login from '../pages/account/Login'
import Register from '../pages/account/Register'
import SubmitFeedback from '../pages/feedback/SubmitFeedback'
import FeedbackDetails from '../pages/feedback/FeedbackDetails'
import Feedbacks from '../pages/feedback/Feedbacks'
import FeedbackDetail from '../pages/admin/FeedbackDetail'
import ManageFeedback from '../pages/admin/ManageFeedback'
import DevelopHome from '../pages/developer/DevelopHome'

const Stack = createStackNavigator()

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login" headerMode="none">
                <Stack.Screen name="adminNavigation" component={Admin} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="registration" component={Register} />
                <Stack.Screen name="main" component={UserNav} />
                <Stack.Screen name="submitFeedback" component={SubmitFeedback} />
                <Stack.Screen name="feedbackDetails" component={FeedbackDetails} />
                <Stack.Screen name="feedbacks" component={Feedbacks} />
                <Stack.Screen name="manageFeedback" component={ManageFeedback} />
                <Stack.Screen name="adminFeedbackDetail" component={FeedbackDetail} />
                <Stack.Screen name="developHome" component={DevelopHome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
