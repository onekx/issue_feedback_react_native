import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Left, Body, Right, Icon, Button } from 'native-base'
import Request from '../../api/Request'
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
        const md = moment(localTime).format('M月DD日')
        const hm = moment(localTime).format('H:mm')
        return {
            month: md,
            hours: hm
        }
    }

    getNickName = () => {
        const { userId } = this.props
        Request(`/profile/${userId}`)
          .then(res => this.setState({
              nickName: res.result.nickname
          }))
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
                    this.issueStatistics()
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

    issueStatistics = () => {
        const { issueId } = this.props
        Request(`/issue/${issueId}/statistics`)
          .then((res) => {
              if (res.ok) {
                this.setState({
                    dislike: res.result.dislikes,
                    like: res.result.likes
                })
              } else {
                this.setState({
                    dislike: 0,
                    like: 0
                })
              }
          })
    }

    componentDidMount() {
        this.getNickName()
        this.issueStatistics()
    }

    render() {
        const { description } = this.props
        const { nickName, like, dislike, likeColor, dislikeColor } = this.state
        return(
            <Card>
                <CardItem header>
                    <Left>
                        <Thumbnail square small source={require('../../assets/images/defaultAvatar.jpg')} />
                        <Text>{nickName}</Text>
                    </Left>
                    <Right>
                        <Text note>{this.getLocalTime().month}</Text>
                        <Text note>{this.getLocalTime().hours}</Text>
                    </Right>
                </CardItem>
                <CardItem button onPress={() => alert("This is Feedback Body")}>
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
                        <Text style={{marginLeft: -10, color: likeColor}}>{like}</Text>
                    </Button>
                    <Button iconLeft transparent onPress={()=>this.vote('dislike')}>
                        <Icon type="AntDesign" name="dislike1" style={{fontSize: 20, color: dislikeColor}} />
                        <Text style={{marginLeft: -10, color: dislikeColor}}>{dislike}</Text>
                    </Button>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}
