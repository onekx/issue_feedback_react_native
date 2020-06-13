import React from 'react'
import { Header, Title, Button, Left, Body, Icon, Right } from 'native-base'
import DeviceStorage from '../utils/DeviceStorage'

const AdminHeader = ({ navigation, title }) => {
    return (
        <Header style={{ backgroundColor: '#336699' }}>
            <Left>
                <Button transparent onPress={() => navigation.openDrawer()}>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body style={{ marginLeft: 90 }}>
                <Title>{title}</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => {
                    DeviceStorage.delete('user_id')
                    DeviceStorage.delete('token')
                    navigation.navigate('login')
                }}>
                    <Icon type="AntDesign" name="logout" style={{ fontSize: 18 }} />
                </Button>
            </Right>
        </Header>
    )
}

export default AdminHeader
