import React, { Component } from 'react'
import { Container, Header, Content, Tab, Tabs, Text, Button, Icon, Right, Title, Body, Left, List, ListItem } from 'native-base'
import DeviceStorage from '../../utils/DeviceStorage'
import LocalTime from '../../components/common/LocalTime'

class DevelopHome extends Component {
    state = {
        opening: [],
        closed: []
    }

    componentDidMount() {
        this.getFeedback()
    }

    _renderOpeningFeedback = () => {
        const { opening } = this.state
        const { navigation } = this.props
        const openIssue = []
        if (opening.length === 0)
            return <Text note style={{ marginLeft: 20, marginTop: 20, color: '#666' }}>暂时没有反馈</Text>
        else {
            opening.forEach(val => {
                openIssue.push(
                    <ListItem style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Button transparent onPress={() =>
                                navigation.navigate('feedbackDetails', { id: val.issue_id })}
                            >
                                <Text style={{ color: '#3C4859' }}>{val.title}</Text>
                            </Button>
                        </Body>
                        <Text note>{LocalTime(val.created_at).month}</Text>
                    </ListItem>
                )
            })
            return openIssue
        }
    }

    _renderClosedFeedback = () => {
        const { closed } = this.state
        const { navigation } = this.props
        const closeIssue = []
        if (closed.length === 0)
            return <Text note style={{ marginLeft: 20, marginTop: 20, color: '#666' }}>暂时没有反馈</Text>
        else {
            closed.forEach(val => {
                closeIssue.push(
                    <ListItem style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Button transparent onPress={() =>
                                navigation.navigate('feedbackDetails', { id: val.issue_id })}
                            >
                                <Text style={{ color: '#3C4859' }}>{val.title}</Text>
                            </Button>
                        </Body>
                        <Text note>{LocalTime(val.created_at).month}</Text>
                    </ListItem>
                )
            })
            return closeIssue
        }
    }

    getFeedback = async () => {
        const url = 'http://192.168.154.131:8923/service/v1/issue/developer'
        const devId = await DeviceStorage.get('user_id')
        const res = await fetch(`${url}/${devId}`).then(res => res.json())
        const { issues } = res.result
        const openingFeedback = []
        const closedFeedback = []
        if (res) {
            issues.forEach(val => {
                val.status === 'opening'
                    ? openingFeedback.push(val)
                    : closedFeedback.push(val)
            })
            this.setState({
                opening: openingFeedback,
                closed: closedFeedback
            })
        }
        else console.log(res)
    }

    render() {
        const { navigation } = this.props
        return (
            <Container>
                <Header hasTabs style={{ backgroundColor: '#336699' }}>
                    <Left />
                    <Body>
                        <Text style={{ color: '#fff', fontSize: 17, marginLeft: 73 }}>开发中心</Text>
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
                <Tabs>
                    <Tab heading="待解决"
                        tabStyle={{ backgroundColor: '#336699' }}
                        activeTabStyle={{ backgroundColor: '#336699' }}
                    >
                        <List>
                            {this._renderOpeningFeedback()}
                        </List>
                    </Tab>
                    <Tab heading="已解决"
                        tabStyle={{ backgroundColor: '#336699' }}
                        activeTabStyle={{ backgroundColor: '#336699' }}
                    >
                        <List>
                            {this._renderClosedFeedback()}
                        </List>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default DevelopHome
