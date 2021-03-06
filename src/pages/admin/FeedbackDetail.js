import React, { Component } from 'react'
import {
    Container, Header, Title, Content, Button, Left, List, Right,
    Body, Icon, Text, Card, CardItem, H3, ListItem, Separator, Spinner
} from 'native-base'
import { View, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import {
    get_tag, set_tag, issue_by_id, assign_issue,
    comment, submit_comment, get_developers, change_status
} from '../../api/RequestFactory'
import LocalTime from '../../components/common/LocalTime'
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
        developers: [],
        developersName: [],
        commentList: [],
        commentText: '',
        status: '',
        loading: true
    }

    componentDidMount() {
        this.getTags()
        this.getIssueContent()
        this.getUnspecifiedDeveloper()
        this.getComment()
    }

    // 获取该 issue 的详细信息
    getIssueContent = async () => {
        const { issueId } = this.props.route.params
        const res = await issue_by_id(issueId)
        this.setState({
            title: res.result.title,
            content: res.result.description,
            issueTags: res.result.tags,
            developers: res.result.developers,
            status: res.result.status
        })
    }

    // 获取所有标签并返回带有标签颜色的新数组
    getTags = async () => {
        const res = await get_tag()
        const { tags } = res.result
        this.setState({ labels: tags })
    }

    // 获取该反馈的所有评论
    getComment = async () => {
        const { issueId } = this.props.route.params
        const res = await comment(issueId)
        res.ok ? this.setState({
            commentList: res.result.comments,
            loading: false
        })
            : console.log(res)
    }

    // 给 issue 设置标签
    putTag = async (name) => {
        const { issueId } = this.props.route.params
        const data = { "tags_name": [name] }
        const res = await set_tag(issueId, data)
        if (res.ok) {
            this.setState({ tagModalVisible: false })
            this.getIssueContent()
        } else console.log(res)
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
        const data = { "developer_ids": [devId] }
        const res = await assign_issue(issueId, data)
        if (res.ok) {
            this.setState({ assignModalVisible: false })
            this.getIssueContent()
        } else console.log(res)
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
            this.setState({
                commentText: '',
                commentModalVisible: false
            })
            this.getComment()
        }
        else console.log(res)
    }

    changeStatus = async () => {
        const { status } = this.state
        const userId = await DeviceStorage.get('user_id')
        const { issueId } = this.props.route.params
        let newStatus = ''
        if (status === 'opening') newStatus = 'closed'
        else newStatus = 'opening'
        const data = {
            "user_id": userId,
            "status": newStatus
        }
        const res = await change_status(issueId, data)
        if (res.ok) {
            this.setState({ status: !this.state.status })
            this.getIssueContent()
        } else console.log(res)
    }

    // 渲染状态按钮
    _renderStatusBtn = () => {
        const { status } = this.state
        if (status === 'opening') {
            return (
                <Button style={styles.openButton} onPress={() => this.changeStatus()}>
                    <Icon type="FontAwesome" name="exclamation-circle" style={styles.statusIcon} />
                    <Text style={styles.statusText}>open</Text>
                </Button>
            )
        } else {
            return (
                <Button style={styles.closedButton}>
                    <Icon type="FontAwesome" name="check-circle-o" style={styles.statusIcon} />
                    <Text style={styles.statusText}>closed</Text>
                </Button>
            )
        }
    }

    // 在详情页渲染已经存在的标签
    _renderTags = () => {
        const { issueTags } = this.state
        const tagsArr = []
        issueTags.forEach(tag => {
            if (tag.checked)
                tagsArr.push(
                    <View style={[{ backgroundColor: tag.color }, styles.tagView]}>
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
    _renderAssignees = () => {
        const { developers } = this.state
        const developer = []
        if (developers.length === 0) return <Text />
        else {
            developers.forEach(dev => {
                developer.push(
                    <Text style={{ marginLeft: 10 }}>{dev.nickname}</Text>
                )
            })
            return developer
        }
    }

    // 渲染所有评论
    _renderComment = () => {
        const { commentList } = this.state
        const comments = []
        if (commentList.length === 0) return <Text>目前还没有评论</Text>
        else {
            commentList.forEach(comment => {
                let time = LocalTime(comment.created_at)
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
        const { tagModalVisible, title, content, assignModalVisible, commentModalVisible, loading } = this.state
        if (loading) return <Spinner color='green' />
        else {
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
                                {this._renderStatusBtn()}
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
                                    <Button transparent onPress={() => this.setState({ tagModalVisible: true })}>
                                        <Icon type="MaterialCommunityIcons" name="label-variant-outline" />
                                        <Text style={styles.textSpacing}>设置标签</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent onPress={() => this.setState({ assignModalVisible: true })}>
                                        <Icon type="EvilIcons" name="user" />
                                        <Text style={styles.textSpacing}>指定人员</Text>
                                    </Button>
                                </Body>
                                <Right>
                                    <Button transparent onPress={() => this.setState({ commentModalVisible: true })}>
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
                                {this._renderAssignees()}
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
    openButton: {
        backgroundColor: '#28a745',
        height: 25,
        width: 68,
        marginLeft: 20
    },
    closedButton: {
        backgroundColor: '#cb2431',
        height: 25,
        width: 80,
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
