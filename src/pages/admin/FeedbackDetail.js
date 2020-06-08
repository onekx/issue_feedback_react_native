import React, { Component } from 'react'
import {
    Container, Header, Title, Content, Button, Left, List, Right,
    Body, Icon, Text, Card, CardItem, H3, ListItem, Separator
} from 'native-base'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import labelList from '../../components/LabelList'

class FeedbackDetail extends Component {
    state = {
        isModalVisible: false
    }

    toggleModal = () => {
        const { isModalVisible } = this.state
        this.setState({ isModalVisible: !isModalVisible })
    }

    _renderLabelList = () => {
        const labels = []
        labelList.forEach(label => {
            let { color, title, description } = label
            labels.push(
                <ListItem avatar>
                    <View style={[{ backgroundColor: color }, styles.labelItem]} />
                    <Body>
                        <TouchableOpacity>
                            <Text>{title}</Text>
                            <Text note>{description}</Text>
                        </TouchableOpacity>
                    </Body>
                    <Right />
                </ListItem>
            )
        })
        return labels
    }

    render() {
        const { navigation } = this.props
        const { isModalVisible } = this.state
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
                            <H3>关于播放问题:</H3>
                            <Button style={styles.statusButton}>
                                <Icon type="FontAwesome" name="exclamation-circle" style={styles.statusIcon} />
                                <Text style={styles.statusText}>Open</Text>
                            </Button>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.textColor}>
                                    这是反馈的详细描述
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
                            <View style={{ backgroundColor: 'red', marginLeft: 10, borderRadius: 5 }}>
                                <Text style={{ color: '#fff' }}>Bug</Text>
                            </View>
                            <View style={{ backgroundColor: '#A2EEEF', marginLeft: 10, borderRadius: 5 }}>
                                <Text style={{ color: '#fff' }}>Enhancement</Text>
                            </View>
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
