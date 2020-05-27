import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base'
import Request from '../../api/Request'

export default class Feedback extends Component {
    state = {
        nickName: ''
    }

    getNickName = () => {
        const { userId } = this.props
        Request(`/profile/${userId}`)
          .then(res => this.setState({
              nickName: res.result.nickname
          }))
    }

    render() {
        const { description, time } = this.props
        const { nickName } = this.state
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png"
        if (nickName === '') this.getNickName()
        return(
            <Card>
                <CardItem header>
                    <Left>
                        <Thumbnail square small source={{uri: uri}} />
                        <Text>{nickName}</Text>
                    </Left>
                    <Right>
                        <Text note>{time}</Text>
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
                        <Icon type="AntDesign" name="like1" style={{fontSize: 20, color: 'red'}} />
                        <Text>100</Text>
                        <Icon type="AntDesign" name="dislike1" style={{fontSize: 20, color: 'gray', marginLeft: 10}} />
                        <Text>50</Text>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}
