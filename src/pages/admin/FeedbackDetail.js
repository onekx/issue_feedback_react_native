import React, { Component } from 'react'
import {
    Container, Header, Title, Content, Button, Left, List, Right,
    Body, Icon, Text, Card, CardItem, H3, ListItem, Separator
} from 'native-base'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Modal from 'react-native-modal'
import { get_tag, set_tag, issue_by_id } from '../../api/RequestFactory'

class FeedbackDetail extends Component {
    state = {
        isModalVisible: false,
        labels: [],
        title: '',
        content: '',
        issueTags: []
    }

    componentDidMount() {
        this.getTags()
        this.getIssueContent()
    }

    changeColor = (value) => {
        let color = ''
        switch (value.name) {
            case 'Bug':
                color = '#D73A4A'
                break
            case 'Ducumentation':
                color = '#0075CA'
                break
            case 'Duplication':
                color = '#CFD3D7'
                break
            case 'Enhancement':
                color = '#A2EEEF'
                break
            case 'Help Wanted':
                color = '#008672'
                break
            case 'Question':
                color = '#D876E3'
                break
            case 'Invalid':
                color = '#E4E669'
                break
            default:
                color = '#FFFFFF'
                break
        }
        return color
    }

    _renderTags = () => {
        const { issueTags } = this.state
        const tagsArr = []
        issueTags.forEach(tag => {
            if (tag.checked) {
                tagsArr.push(
                    <View style={{ backgroundColor: this.changeColor(tag), marginLeft: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#fff' }}>{tag.name}</Text>
                    </View>
                )
            }
        })
        return tagsArr
    }

    getIssueContent = async () => {
        const { issueId } = this.props.route.params
        const res = await issue_by_id(issueId)
        this.setState({
            title: res.result.title,
            content: res.result.description,
            issueTags: res.result.tags
        })
    }

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

    // 为标签添加颜色
    addColor = (value) => {
        switch (value.name) {
            case 'Bug':
                value.color = '#D73A4A'
                break
            case 'Ducumentation':
                value.color = '#0075CA'
                break
            case 'Duplication':
                value.color = '#CFD3D7'
                break
            case 'Enhancement':
                value.color = '#A2EEEF'
                break
            case 'Help Wanted':
                value.color = '#008672'
                break
            case 'Question':
                value.color = '#D876E3'
                break
            case 'Invalid':
                value.color = '#E4E669'
                break
            default:
                value.color = '#FFFFFF'
                break
        }
    }

    // 获取所有标签并返回带有标签颜色的新数组
    getTags = async () => {
        const res = await get_tag()
        const { tags } = res.result
        const allTags = []
        tags.forEach(value => {
            this.addColor(value)
            allTags.push(value)
        })
        this.setState({ labels: allTags })
    }

    toggleModal = () => {
        const { isModalVisible } = this.state
        this.setState({ isModalVisible: !isModalVisible })
    }

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

    render() {
        const { navigation } = this.props
        const { isModalVisible, title, content } = this.state
        return (
            <Container>
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => this.toggleModal()}
                >
                    <View style={styles.modalView}>
                        <List>{this._renderLabelList()}</List>
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
                                <Button transparent onPress={() => this.toggleModal()}>
                                    <Icon type="MaterialCommunityIcons" name="label-variant-outline" />
                                    <Text style={styles.textSpacing}>设置标签</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon type="EvilIcons" name="user" />
                                    <Text style={styles.textSpacing}>指定人员</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Button transparent>
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
                            <Text style={{ marginLeft: 10 }}>onekx</Text>
                        </CardItem>
                        <Separator bordered>
                            <Text style={styles.SeparatorText}>用户评论:</Text>
                        </Separator>
                        <Card transparent>
                            <CardItem>
                                <Text style={{ marginRight: 15 }}>kkk</Text>
                                <Text note>6月18号   15:30</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{
                                    color: '#2c2c2c',
                                    marginTop: -10
                                }}>
                                    这是评论内容
                                </Text>
                            </CardItem>
                            <View style={{ height: .8, backgroundColor: '#c4c4c4' }} />
                        </Card>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        height: 520,
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
    }
})

export default FeedbackDetail
