import React from 'react'
import { Header, Title, Button, Left, Body, Icon } from 'native-base'

const AdminHeader = ({ navigation, title }) => {
    return (
        <Header style={{ backgroundColor: '#336699' }}>
            <Left>
                <Button transparent onPress={() => navigation.openDrawer()}>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body style={{ marginLeft: 60 }}>
                <Title>{title}</Title>
            </Body>
        </Header>
    )
}

export default AdminHeader
