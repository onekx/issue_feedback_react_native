import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Left, Body, Right, Icon, Item } from 'native-base'
import { StyleSheet } from 'react-native'
import LocalTime from '../components/LocalTime'

const likeColor = '#0099CC'
const dislikeColor = '#FF6666'

export default class FeedbackCard extends Component {
    state = {
        nickName: '',
        like: 0,
        dislike: 0
    }

    render() {
        const { title, navigation, userName, likes, dislikes, issueId, time } = this.props
        return (
            <Card>
                <CardItem header
                    style={styles.noPadding}>
                    <Left>
                        <Thumbnail square small source={require('../images/defaultAvatar.jpg')} />
                        <Text>{userName}</Text>
                    </Left>
                    <Right>
                        <Text note>{LocalTime(time).month}</Text>
                        <Text note>{LocalTime(time).hours}</Text>
                    </Right>
                </CardItem>
                <CardItem
                    button
                    style={styles.noPadding}
                    onPress={() =>
                        navigation.navigate('feedbackDetails', { id: issueId })}
                >
                    <Body>
                        <Text numberOfLines={1}>
                            {title}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Left>
                        <Item style={styles.item}>
                            <Icon type="AntDesign" name="like1" style={styles.likeIcon} />
                            <Text style={{ color: likeColor }}>{likes}</Text>
                        </Item>
                        <Item style={styles.item}>
                            <Icon type="AntDesign" name="dislike1" style={styles.dislikeIcon} />
                            <Text style={{ color: dislikeColor }}>{dislikes}</Text>
                        </Item>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    likeIcon: {
        fontSize: 20,
        color: likeColor
    },
    dislikeIcon: {
        fontSize: 20,
        color: dislikeColor
    },
    item: {
        borderBottomColor: '#fff',
        marginRight: 10
    },
    noPadding: {
        paddingBottom: 0
    }
})
