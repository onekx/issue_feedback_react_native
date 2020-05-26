import React, { Component } from 'react'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base'
import DeviceStorage from '../DeviceStorage'

class AdminHeader extends Component {
    logoutAccount = () => {
        const { navigation } = this.props
        DeviceStorage.delete('token')
        DeviceStorage.delete('user_id')
        navigation.navigate('登录')
    }

    render() {
        const { navigation } = this.props
        const { title } = this.props
        return(
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{title}</Title>
                    </Body>
                    <Right>
                        <Button transparent 
                            onPress={this.logoutAccount}>
                            <Icon type="AntDesign" name='logout' />
                        </Button>
                    </Right>
                </Header>
        )}
}

export default AdminHeader
