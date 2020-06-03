import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Left, Body, Right, Icon, Button } from 'native-base'
import Request from '../api/Request'
import moment from 'moment'

export default class Feedback extends Component {
    state = {
        nickName: '',
        like: 0,
        dislike: 0,
        likeColor: 'gray',
        dislikeColor: 'gray'
    }

    getLocalTime = () => {
        const { time } = this.props
        const localTime = moment.utc(time).toDate()
        const md = moment(localTime).format('M月D日')
        const hm = moment(localTime).format('H:mm')
        return {
            month: md,
            hours: hm
        }
    }

    vote = (opinion) => {
        const { userId, issueId } = this.props
        const data = {
            "user_id": userId,
            "opinion": opinion
        }
        Request(`/issue/${issueId}/vote`, data, 'put')
            .then(res=>{
                if(res.ok) {
                    this.changeOpinion(res.result.opinion)
                }
            })
    }

    changeOpinion = (opinion) => {
        switch (opinion) {
            case 'like':
                this.setState({
                    likeColor: 'red',
                    dislikeColor: 'gray'
                })
                break
            case 'dislike':
                this.setState({
                    likeColor: 'gray',
                    dislikeColor: 'red'
                })
                break
            default:
                this.setState({
                    likeColor: 'gray',
                    dislikeColor: 'gray'
                })
        }
    }

    render() {
        const { description, navigation, userName, likes, dislikes, issueId } = this.props
        const { likeColor, dislikeColor } = this.state
        return(
            <Card>
                <CardItem header>
                    <Left>
                        <Thumbnail square small source={require('../images/defaultAvatar.jpg')} />
                        <Text>{userName}</Text>
                    </Left>
                    <Right>
                        <Text note>{this.getLocalTime().month}</Text>
                        <Text note>{this.getLocalTime().hours}</Text>
                    </Right>
                </CardItem>
                <CardItem button onPress={() => 
                    navigation.navigate('feedbackDetails', {
                        name: userName,
                        md: this.getLocalTime().month,
                        hm: this.getLocalTime().hours,
                        content: description,
                        id: issueId
                })}>
                    <Body>
                        <Text numberOfLines={1}>
                            {description}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Left>
                    <Button iconLeft transparent onPress={()=>this.vote('like')}>
                        <Icon type="AntDesign" name="like1" style={{fontSize: 20, color: likeColor}} />
                        <Text style={{marginLeft: -10, color: likeColor}}>{likes}</Text>
                    </Button>
                    <Button iconLeft transparent onPress={()=>this.vote('dislike')}>
                        <Icon type="AntDesign" name="dislike1" style={{fontSize: 20, color: dislikeColor}} />
                        <Text style={{marginLeft: -10, color: dislikeColor}}>{dislikes}</Text>
                    </Button>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}
