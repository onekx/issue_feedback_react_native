import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ManageFeedback from './ManageFeedback'
import CreateProduct from './CreateProduct'

const Drawer = createDrawerNavigator()

export default function Admin() {   
    return(
        <Drawer.Navigator initialRouteName="管理反馈">
            <Drawer.Screen name="管理反馈" component={ManageFeedback} />
            <Drawer.Screen name="创建产品" component={CreateProduct} />
        </Drawer.Navigator>
    )
}
