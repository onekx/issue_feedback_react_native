import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'
import AdminHeader from './AdminHeader'

class CreateProduct extends Component {
    render() {
        const { navigation } = this.props
        return(
            <Container>
                <AdminHeader title="创建产品" navigation={navigation} />
                <Content>
                    <Text>
                        创建产品
                    </Text>
                </Content>
            </Container>
        )
    }
}

export default CreateProduct
