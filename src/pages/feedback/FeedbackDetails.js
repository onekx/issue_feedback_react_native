import React, { Component } from 'react'
import {
    Container, Content, ListItem, Text, Left, Body, Card,
    CardItem, Thumbnail, Icon, Button, Right, Spinner
} from 'native-base'
import { View, StyleSheet, Modal, TouchableHighlight, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
import CommentCard from '../../components/CommentCard'
import { comment, submit_comment, user_opinion, submit_opinion, issue_by_id } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import moment from 'moment'
import HeaderModel from '../../components/HeaderModel'

export default class FeedbackDetails extends Component {
    state = {
        commentList: [],
        modalVisible: false,
        commentText: '',
        likeColor: '#c4c4c4',
        dislikeColor: '#c4c4c4',
        loading: true,
        name: '',
        description: '',
        time: '',
        likeCount: 0,
        dislikeCount: 0
    }

    componentDidMount() {
        this.getIssueContent()
        this.getIssueStatistics()
        this.getUserOpinion()
        this.getCommentList()
    }

    getIssueContent = async () => {
        const { id } = this.props.route.params
        const res = await issue_by_id(id)
        res.ok ? this.setState({
            title: res.result.title,
            name: res.result.owner.nickname,
            description: res.result.description,
            time: res.result.created_at
        })
            : console.log(res)
    }

    getIssueStatistics = () => {
        const { id } = this.props.route.params
        const url = 'http://192.168.154.131:8923/service/v1/issue'
        fetch(`${url}/${id}/statistics`)
            .then(res => res.json())
            .then(res => this.setState({
                likeCount: res.result.likes,
                dislikeCount: res.result.dislikes
            }))
    }

    getCommentList = async () => {
        const { id } = this.props.route.params
        const res = await comment(id)
        res.ok ? this.setState({
            commentList: res.result.comments,
            loading: false
        })
            : console.log(res.errors.message)
    }

    getUserOpinion = async () => {
        const { id } = this.props.route.params
        const userId = await DeviceStorage.get('user_id')
        const res = await user_opinion(id, userId)
        const opinion = res.result.opinion
        switch (opinion) {
            case "like":
                this.setState({ likeColor: '#d73a4a' })
                break
            case "dislike":
                this.setState({ dislikeColor: '#d73a4a' })
                break
            default:
                this.setState({
                    likeColor: '#c4c4c4',
                    dislikeColor: '#c4c4c4'
                })
        }
    }

    putOpinion = async (opinion) => {
        const { id } = this.props.route.params
        const userId = await DeviceStorage.get('user_id')
        const data = {
            "user_id": userId,
            "opinion": opinion
        }
        const res = await submit_opinion(id, data)
        if (res.ok) {
            this.modifyColor(opinion)
            this.getIssueStatistics()
        } else console.log(res)
    }

    modifyColor = (opinion) => {
        const { likeColor, dislikeColor } = this.state
        if (opinion === 'like') {
            likeColor === '#d73a4a'
                ? this.setState({
                    likeColor: '#c4c4c4'
                })
                : this.setState({
                    likeColor: '#d73a4a',
                    dislikeColor: '#c4c4c4'
                })
        } else {
            dislikeColor === '#d73a4a'
                ? this.setState({
                    dislikeColor: '#c4c4c4'
                })
                : this.setState({
                    dislikeColor: '#d73a4a',
                    likeColor: '#c4c4c4'
                })
        }
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
            this.setState({
                commentText: '',
                modalVisible: false
            })
            this.getCommentList()
        } else console.log(res)
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
        const { modalVisible, likeColor, dislikeColor, loading, name, description, time, likeCount, dislikeCount } = this.state
        if (loading) return <Spinner color='green' />
        else {
            return (
                <Container>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => alert("弹窗将关闭")}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ modalVisible: false })}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <TextInput
                                        multiline
                                        autoFocus
                                        onChangeText={value => this.setState({ commentText: value })}
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
                    <HeaderModel navigation={navigation} title={'反馈详情'} />
                    <Content>
                        <Card transparent>
                            <CardItem>
                                <Left>
                                    <Thumbnail square small source={require('../../images/defaultAvatar.jpg')} />
                                    <Body>
                                        <Text>{name}</Text>
                                        <Text note>{`${this.getLocalTime(time).month}   ${this.getLocalTime(time).hours}`}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem style={{ marginTop: -10 }}>
                                <Body>
                                    <Text style={{ color: '#2c2c2c' }}>
                                        {description}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ marginTop: -10 }}>
                                <Left>
                                    <Button iconLeft transparent onPress={() => this.putOpinion('like')}>
                                        <Icon type="AntDesign" name="like1" style={{ fontSize: 20, color: likeColor }} />
                                        <Text style={{ marginLeft: -10, color: likeColor }}>{likeCount}</Text>
                                    </Button>
                                    <Button iconLeft transparent onPress={() => this.putOpinion('dislike')}>
                                        <Icon type="AntDesign" name="dislike1" style={{ fontSize: 20, color: dislikeColor }} />
                                        <Text style={{ marginLeft: -10, color: dislikeColor }}>{dislikeCount}</Text>
                                    </Button>
                                </Left>
                                <Right>
                                    <Button transparent onPress={() => this.setState({ modalVisible: true })}>
                                        <Icon type="FontAwesome" name="comment" style={{ color: '#0066CC' }} />
                                        <Text style={{ color: '#0066CC' }}>写评论</Text>
                                    </Button>
                                </Right>
                            </CardItem>
                            <ListItem itemDivider />
                        </Card>
                        {this._renderComment()}
                    </Content>
                </Container>
            )
        }
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
