import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base'

export default class Feedback extends Component {
    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png"
        return(
            <Card>
                <CardItem header>
                    <Left>
                        <Thumbnail square small source={{uri: uri}} />
                        <Text>昵称</Text>
                    </Left>
                    <Right>
                        <Text note>3:04</Text>
                    </Right>
                </CardItem>
                <CardItem button onPress={() => alert("This is Feedback Body")}>
                    <Body>
                        <Text numberOfLines={1}>
                            这是我的反馈这是我的反馈这是我的反馈这是我的反馈这是我的反馈
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
