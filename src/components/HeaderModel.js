import React from 'react'
import { Header, Left, Body, Right, Button, Title, Icon } from 'native-base'

const HeaderModel = ({ navigation, title }) => {
    return (
        <Header style={{ backgroundColor: '#336699' }}>
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon type="AntDesign" name='arrowleft' />
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right />
        </Header>
    )
}

export default HeaderModel
