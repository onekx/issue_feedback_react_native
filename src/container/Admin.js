import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ManageFeedback from '../pages/admin/ManageFeedback'
import CreateProduct from '../pages/admin/CreateProduct'

const Drawer = createDrawerNavigator()

const Admin = () => {   
    return(
        <Drawer.Navigator initialRouteName="管理反馈">
            <Drawer.Screen name="管理反馈" component={ManageFeedback} />
            <Drawer.Screen name="创建产品" component={CreateProduct} />
        </Drawer.Navigator>
    )
}

export default Admin
