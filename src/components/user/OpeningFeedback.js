import React, { Component } from 'react'
import { Text, Button, Body, List, ListItem } from 'native-base'
import { user_feedbacks } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import LocalTime from '../common/LocalTime'

class OpeningFeedbacks extends Component {
    state = {
        feedbacks: []
    }

    componentDidMount() {
        this.getFeedbacks()
    }

    getFeedbacks = async () => {
        const userId = await DeviceStorage.get('user_id')
        const res = await user_feedbacks(userId)
        res.ok ? this.setState({ feedbacks: res.result.issues })
            : console.log(res)
    }

    _renderFeedbacks = () => {
        const { feedbacks } = this.state
        const { navigation } = this.props
        const result = []
        feedbacks.forEach(feedback => {
            if (feedback.status === 'opening') {
                result.push(
                    <ListItem style={{ borderBottomWidth: 1 }}>
                        <Body>
                            <Button transparent onPress={() =>
                                navigation.navigate('feedbackDetails', { id: feedback.issue_id })}
                            >
                                <Text style={{ color: '#3C4859' }}>{feedback.title}</Text>
                            </Button>
                        </Body>
                        <Text note>{LocalTime(feedback.created_at).month}</Text>
                    </ListItem>
                )
            }
        })
        return result
    }

    render() {
        return (
            <List>
                {this._renderFeedbacks()}
            </List>
        )
    }
}

export default OpeningFeedbacks
