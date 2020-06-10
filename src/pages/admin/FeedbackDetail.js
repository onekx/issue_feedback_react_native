import React, { Component } from 'react'
import {
    Container, Header, Title, Content, Button, Left, List, Right,
    Body, Icon, Text, Card, CardItem, H3, ListItem, Separator
} from 'native-base'
import { View, StyleSheet, TouchableOpacity, Alert, TextInput, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import {
    get_tag, set_tag, issue_by_id, get_profile,
    assign_issue, comment, submit_comment, get_developers
} from '../../api/RequestFactory'
import { addColor, changeColor } from '../../components/LabelColor'
import moment from 'moment'
import DeviceStorage from '../../utils/DeviceStorage'

class FeedbackDetail extends Component {
    state = {
        tagModalVisible: false,
        assignModalVisible: false,
        commentModalVisible: false,
        labels: [],
        title: '',
        content: '',
        issueTags: [],
        unspecifiedDeveloper: [],
        developersId: [],
        developersName: [],
        commentList: [],
        commentText: ''
    }

    componentDidMount() {
        this.getTags()
        this.getIssueContent()
        this.getUnspecifiedDeveloper()
        this.getComment()
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

    // 获取该 issue 的详细信息
    getIssueContent = async () => {
        const { issueId } = this.props.route.params
        const res = await issue_by_id(issueId)
        this.setState({
            title: res.result.title,
            content: res.result.description,
            issueTags: res.result.tags,
            developersId: res.result.developer_ids
        })
    }

    // 获取所有标签并返回带有标签颜色的新数组
    getTags = async () => {
        const res = await get_tag()
        const { tags } = res.result
        const allTags = []
        tags.forEach(value => {
            addColor(value)
            allTags.push(value)
        })
        this.setState({ labels: allTags })
    }

    // 获取该反馈的所有评论
    getComment = async () => {
        const { issueId } = this.props.route.params
        const res = await comment(issueId)
        res.ok ? this.setState({ commentList: res.result.comments })
            : console.log(res)
    }

    // 给 issue 设置标签
    putTag = async (name) => {
        const { issueId } = this.props.route.params
        const data = {
            "issue_id": issueId,
            "tags_name": [name]
        }
        const res = await set_tag(issueId, data)
        res.ok ? Alert.alert('设置成功！')
            : console.log(res)
    }

    // 获取未指定的开发人员
    getUnspecifiedDeveloper = async () => {
        const { issueId } = this.props.route.params
        const res = await get_developers(issueId)
        this.setState({
            unspecifiedDeveloper: res.result.developers
        })
    }

    // 为 issue 指定开发人员
    assingDeveloper = async (devId) => {
        const { issueId } = this.props.route.params
        const data = {
            "issue_id": issueId,
            "developer_id": devId
        }
        const res = await assign_issue(issueId, data)
        res.ok ? Alert.alert('指定成功！')
            : console.log(res)
    }

    sendComment = async () => {
        const { commentText } = this.state
        const { issueId } = this.props.route.params
        const userId = await DeviceStorage.get('user_id')
        const data = {
            "issue_id": issueId,
            "user_id": userId,
            "content": commentText
        }
        const res = await submit_comment(data)
        if (res.ok) {
            Alert.alert('评论成功！')
            this.setState({
                commentText: ''
            })
        }
        else console.log(res)
    }

    // 在详情页渲染已经存在的标签
    _renderTags = () => {
        const { issueTags } = this.state
        const tagsArr = []
        issueTags.forEach(tag => {
            if (tag.checked)
                tagsArr.push(
                    <View style={[{ backgroundColor: changeColor(tag) }, styles.tagView]}>
                        <Text style={{ color: '#fff' }}>{tag.name}</Text>
                    </View>
                )
        })
        return tagsArr
    }

    // 在弹出层渲染所有标签
    _renderLabelList = () => {
        const { labels } = this.state
        const tags = []
        labels.forEach(label => {
            let { color, name, description } = label
            tags.push(
                <ListItem avatar>
                    <View style={[{ backgroundColor: color }, styles.labelItem]} />
                    <Body>
                        <TouchableOpacity onPress={() => this.putTag(name)}>
                            <Text>{name}</Text>
                            <Text note>{description}</Text>
                        </TouchableOpacity>
                    </Body>
                    <Right />
                </ListItem>
            )
        })
        return tags
    }

    // 在弹出层渲染未指定的开发人员
    _renderDeveloper = () => {
        const { unspecifiedDeveloper } = this.state
        const allDev = []
        if (unspecifiedDeveloper.length === 0) return <Text>没有未指定的开发人员</Text>
        else {
            unspecifiedDeveloper.forEach(dev => {
                allDev.push(
                    <ListItem avatar>
                        <Body>
                            <TouchableOpacity onPress={() => this.assingDeveloper(dev.user_id)}>
                                <Text>{dev.nickname}</Text>
                            </TouchableOpacity>
                        </Body>
                        <Right />
                    </ListItem>
                )
            })
            return allDev
        }
    }

    // 在详情页渲染已经指定的开发人员
    _renderAssignees = async () => {
        const { developersId } = this.state
        const developer = []
        if (developersId.length === 0) return <Text />
        else {
            for (let item of developersId) {
                let res = await get_profile(item)
                let { nickname } = res.result
                developer.push(
                    <Text style={{ marginLeft: 10 }}>{nickname}</Text>
                )
            }
            this.setState({ developersName: developer })
        }
    }

    // 渲染所有评论
    _renderComment = () => {
        const { commentList } = this.state
        const comments = []
        if (commentList.length === 0) return <Text>目前还没有评论</Text>
        else {
            commentList.forEach(comment => {
                let time = this.getLocalTime(comment.created_at)
                comments.push(
                    <Card transparent>
                        <CardItem>
                            <Text note style={{ marginRight: 15 }}>{comment.owner.nickname}</Text>
                            <Text note>{`${time.month}   ${time.hours}`}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: '#2c2c2c', marginTop: -10 }}>
                                {comment.content}
                            </Text>
                        </CardItem>
                        <View style={styles.divider} />
                    </Card>
                )
            })
            return comments
        }
    }

    render() {
        const { navigation } = this.props
        const { tagModalVisible, title, content, assignModalVisible, developersName, commentModalVisible } = this.state
        if (developersName.length === 0) this._renderAssignees()
        return (
            <Container>
                <Modal
                    isVisible={tagModalVisible}
                    onBackdropPress={() => this.setState({ tagModalVisible: !tagModalVisible })}
                >
                    <View style={styles.modalView}>
                        <List>{this._renderLabelList()}</List>
                    </View>
                </Modal>
                <Modal
                    isVisible={assignModalVisible}
                    onBackdropPress={() => this.setState({ assignModalVisible: !assignModalVisible })}
                >
                    <View style={styles.modalView}>
                        <List>{this._renderDeveloper()}</List>
                    </View>
                </Modal>
                <Modal
                    isVisible={commentModalVisible}
                    onBackdropPress={() => this.setState({ commentModalVisible: !commentModalVisible })}
                >
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
                </Modal>
                <Header style={styles.headerColor}>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon type="AntDesign" name='arrowleft' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>反馈详情</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card transparent>
                        <CardItem>
                            <H3>{`${title}：`}</H3>
                            <Button style={styles.statusButton}>
                                <Icon type="FontAwesome" name="exclamation-circle" style={styles.statusIcon} />
                                <Text style={styles.statusText}>Open</Text>
                            </Button>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.textColor}>
                                    {content}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem style={styles.itemSpacing}>
                            <Left>
                                <Button transparent onPress={() => this.setState({ tagModalVisible: !tagModalVisible })}>
                                    <Icon type="MaterialCommunityIcons" name="label-variant-outline" />
                                    <Text style={styles.textSpacing}>设置标签</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent onPress={() => this.setState({ assignModalVisible: !assignModalVisible })}>
                                    <Icon type="EvilIcons" name="user" />
                                    <Text style={styles.textSpacing}>指定人员</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => this.setState({ commentModalVisible: !commentModalVisible })}>
                                    <Icon type="FontAwesome" name="comment-o" />
                                    <Text style={styles.textSpacing}>评论</Text>
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem style={styles.itemSpacing}>
                            <Text style={styles.textColor}>label:</Text>
                            {this._renderTags()}
                        </CardItem>
                        <CardItem style={styles.itemSpacing}>
                            <Text style={styles.textColor}>assignees:</Text>
                            {developersName}
                        </CardItem>
                        <Separator bordered>
                            <Text style={styles.SeparatorText}>用户评论:</Text>
                        </Separator>
                    </Card>
                    {this._renderComment()}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 10
    },
    labelItem: {
        height: 30,
        width: 30,
        borderRadius: 5
    },
    headerColor: {
        backgroundColor: '#336699'
    },
    statusButton: {
        backgroundColor: '#28a745',
        height: 25,
        width: 68,
        marginLeft: 20
    },
    statusIcon: {
        fontSize: 15,
        marginLeft: 5
    },
    statusText: {
        paddingLeft: 0,
        marginLeft: -10
    },
    textColor: {
        color: '#586069'
    },
    itemSpacing: {
        paddingTop: 0,
        marginTop: -10
    },
    textSpacing: {
        marginLeft: -10
    },
    SeparatorText: {
        fontSize: 15
    },
    divider: {
        height: .8,
        backgroundColor: '#c4c4c4'
    },
    tagView: {
        marginLeft: 10,
        borderRadius: 5
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

export default FeedbackDetail
