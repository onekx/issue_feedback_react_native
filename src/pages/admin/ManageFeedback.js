import React, { Component } from 'react'
import { Container, Content, Tab, Tabs } from 'native-base'
import ClosedFeedback from '../admin/ClosedFeedback'
import OpeningFeedback from '../admin/OpeningFeedback'
import AdminHeader from '../../components/AdminHeader'

class ManageFeedback extends Component {
    render() {
        const { navigation } = this.props
        return (
            <Container>
                <AdminHeader title="管理反馈" navigation={navigation} />
                <Content>
                    <Tabs>
                        <Tab heading="待解决">
                            <OpeningFeedback />
                        </Tab>
                        <Tab heading="已关闭">
                            <ClosedFeedback />
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}

export default ManageFeedback
