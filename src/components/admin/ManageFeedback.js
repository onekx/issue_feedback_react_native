import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'
import AdminHeader from './AdminHeader'

class ManageFeedback extends Component {
    render() {
        const { navigation } = this.props
        return(
            <Container>
                <AdminHeader title="管理反馈" navigation={navigation} />
                <Content>
                    <Text>
                        管理反馈
                    </Text>
                </Content>
            </Container>
        )
    }
}

export default ManageFeedback
