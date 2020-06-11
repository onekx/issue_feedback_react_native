import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ManageFeedback from '../pages/admin/ManageFeedback'
import ManageProduct from '../pages/admin/ManageProduct'

const Drawer = createDrawerNavigator()

const Admin = () => {   
    return(
        <Drawer.Navigator initialRouteName="管理反馈">
            <Drawer.Screen name="管理反馈" component={ManageFeedback} />
            <Drawer.Screen name="管理产品" component={ManageProduct} />
        </Drawer.Navigator>
    )
}

export default Admin
