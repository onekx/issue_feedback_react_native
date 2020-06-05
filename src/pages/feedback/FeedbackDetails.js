import React, { Component } from 'react'
import { Container, Content, ListItem, Text, Left, Body, Card, CardItem, Thumbnail, Icon, Button, Right } from 'native-base'
import { View, StyleSheet, Modal, TouchableHighlight, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
import CommentCard from '../../components/CommentCard'
import { comment, submit_comment } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import moment from 'moment'

export default class FeedbackDetails extends Component {
    state = {
        commentList: [],
        modalVisible: false,
        commentText: ''
    }

    getCommentList = async () => {
        const { id } = this.props.route.params
        const res = await comment(id)
        res.ok ? this.setState({ commentList: res.result.comments })
            : console.log(res.errors.message)
    }

    componentDidMount() {
        this.getCommentList()
    }

    _renderComment = () => {
        const { commentList } = this.state
        const commentsArr = []
        commentList.forEach(comment => {
            commentsArr.push(
                <CommentCard
                    name={comment.owner.nickname}
                    month={this.getLocalTime(comment.created_at).month}
                    hours={this.getLocalTime(comment.created_at).hours}
                    content={comment.content}
                />
            )
        })
        return commentsArr
    }

    sendComment = async () => {
        const { commentText } = this.state
        const { id } = this.props.route.params
        const userId = await DeviceStorage.get('user_id')
        const data = {
            "issue_id": id,
            "user_id": userId,
            "content": commentText
        }
        const res = await submit_comment(data)
        if (res.ok) {
            Alert.alert('评论成功！')
            this.setState({
                commentText: '',
                modalVisible: false
            })
        }
        else console.log(res)
    }

    getLocalTime = (time) => {
        const localTime = moment.utc(time).toDate()
        const md = moment(localTime).format('M月D日')
        const hm = moment(localTime).format('H:mm')
        return {
            month: md,
            hours: hm
        }
    }

    render() {
        const { route, navigation } = this.props
        const { modalVisible } = this.state
        return (
            <Container>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        alert("弹窗将关闭")
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({ modalVisible: false })}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    multiline
                                    autoFocus
                                    onChangeText={value => this.setState({
                                        commentText: value
                                    })}
                                />
                                <TouchableHighlight style={styles.sendBtn}
                                    onPress={() => this.sendComment()}
                                >
                                    <Text style={styles.sendText}>发送</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Content>
                    <Card transparent>
                        <CardItem>
                            <Left>
                                <Thumbnail square small source={require('../../images/defaultAvatar.jpg')} />
                                <Body>
                                    <Text>{route.params.name}</Text>
                                    <Text note>{`${route.params.md}    ${route.params.hm}`}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Button transparent onPress={() => navigation.goBack()}>
                                    <Icon type="AntDesign" name="back" style={{ fontSize: 20 }} />
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem style={{ marginTop: -10 }}>
                            <Body>
                                <Text style={{ color: '#2c2c2c' }}>
                                    {route.params.content}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={{ marginTop: -10 }}>
                            <Left>
                                <Button transparent onPress={() => this.setState({ modalVisible: true })}>
                                    <Icon type="FontAwesome" name="comment" style={{ color: 'gray' }} />
                                    <Text style={{ color: 'gray' }}>写评论</Text>
                                </Button>
                            </Left>
                        </CardItem>
                        <ListItem itemDivider />
                    </Card>
                    {this._renderComment()}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        height: 150,
        backgroundColor: '#fff'
    },
    sendBtn: {
        height: 30,
        width: 50,
        backgroundColor: '#2C71FF',
        borderRadius: 4,
        position: 'absolute',
        bottom: 15,
        right: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendText: {
        color: '#fff',
        fontSize: 14
    }
})
