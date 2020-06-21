import React, { Component } from 'react'
import {
    Container, Content, Text, Thumbnail, Icon, Header, Form,
    Right, Button, Tab, Tabs, Spinner, List, ListItem, Input
} from 'native-base'
import { View, TouchableOpacity, StyleSheet, Modal, Alert, Picker } from 'react-native'
import { get_profile, update_profile } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import OpeningFeedbacks from '../../components/user/OpeningFeedback'
import ClosedFeedbacks from '../../components/user/ClosedFeedback'
import AvatarSource from '../../components/user/AvatarSource'

export default class User extends Component {
    state = {
        userId: '',
        nickName: '',
        gender: 1,
        avatar: '',
        modalVisible: false,
        avatarModal: false,
        profileModal: false,
        loading: true,
        selected: "female",
        inputNickname: ''
    }

    getProfile = async () => {
        const userId = await DeviceStorage.get("user_id")
        const res = await get_profile(userId)
        if (res.ok) {
            this.setState({
                nickName: res.result.nickname,
                gender: res.result.gender,
                avatar: res.result.avatar,
                loading: false
            })
            if (this.state.gender === 0)
                this.setState({ selected: 'male' })
        }
        else console.log(res)
    }

    updateNickName = async () => {
        const { inputNickname } = this.state
        const userId = await DeviceStorage.get("user_id")
        const data = { "nickname": inputNickname }
        const res = await update_profile(userId, data)
        res.ok ? Alert.alert('修改成功！')
            : Alert.alert('修改失败！')
    }

    updateGender = async (value) => {
        this.setState({ selected: value })
        const userId = await DeviceStorage.get("user_id")
        const data = { "gender": 1 }
        if (this.state.selected === 'male') data.gender = 0
        const res = await update_profile(userId, data)
        res.ok ? Alert.alert('修改成功！')
            : Alert.alert('修改失败！')
    }

    updateAvatar = async (avaName) => {
        const userId = await DeviceStorage.get("user_id")
        const data = { "avatar": avaName }
        const res = await update_profile(userId, data)
        if (res.ok) {
            this.setState({ avatarModal: false })
            this.getProfile()
        } else console.log(res)
    }

    logoutAccount = () => {
        const { navigation } = this.props
        DeviceStorage.delete('token')
        DeviceStorage.delete('user_id')
        navigation.navigate('login')
    }

    checkGender = () => {
        const { gender } = this.state
        if (gender === 1) {
            return <Icon name="female" style={styles.female} />
        } else {
            return <Icon name="male" style={styles.male} />
        }
    }

    _renderAvatar = (avaName) => {
        const avaArr = []
        avaName.forEach(val => {
            avaArr.push(
                <TouchableOpacity style={{ padding: 5 }} onPress={() => this.updateAvatar(val)}>
                    <Thumbnail square source={AvatarSource[val]} />
                </TouchableOpacity>
            )
        })
        return avaArr
    }

    showAvatar = () => {
        const { avatar } = this.state
        if (avatar === '') return <Thumbnail source={require('../../images/defaultAvatar.jpg')} />
        else return <Thumbnail source={AvatarSource[avatar]} />
    }

    componentDidMount() {
        this.getProfile()
    }

    render() {
        const { nickName, modalVisible, avatarModal, loading, selected, profileModal } = this.state
        const { navigation } = this.props
        if (loading) return <Spinner color='green' />
        else {
            return (
                <Container>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => this.setState({ modalVisible: false })}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                <Text style={{ alignSelf: 'center' }}>确认退出？</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                                    >
                                        <Text>否</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.logoutAccount()}
                                    >
                                        <Text>是</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        transparent={true}
                        visible={avatarModal}
                        onRequestClose={() => this.setState({ avatarModal: false })}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.avatarModal}>
                                <TouchableOpacity onPress={() => this.setState({ avatarModal: false })}
                                    style={styles.closeBtn}
                                >
                                    <Text>×</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    {this._renderAvatar(['a1', 'a2', 'a3'])}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {this._renderAvatar(['a4', 'a5', 'a6'])}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {this._renderAvatar(['a7', 'a8', 'a9'])}
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        transparent={true}
                        visible={profileModal}
                        onRequestClose={() => this.setState({ profileModal: false })}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.profileView}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ profileModal: false })
                                    this.getProfile()
                                }}
                                    style={styles.closeProfile}
                                >
                                    <Text style={{fontSize: 20}}>×</Text>
                                </TouchableOpacity>
                                <List>
                                    <ListItem>
                                        <Text>昵称：</Text>
                                        <Input
                                            placeholder={nickName}
                                            onChangeText={value =>
                                                this.setState({
                                                    inputNickname: value
                                                })}
                                            style={{ borderBottomWidth: 1, borderBottomColor: '#000' }} />
                                        <Button
                                            style={{ height: 30 }}
                                            onPress={() => this.updateNickName()}
                                        >
                                            <Text>确认</Text>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Text>性别：</Text>
                                        <Form>
                                            <Picker
                                                note
                                                mode="dialog"
                                                style={{ width: 50, marginLeft: 50 }}
                                                selectedValue={selected}
                                                onValueChange={this.updateGender}
                                            >
                                                <Picker.Item label="女" value="female" />
                                                <Picker.Item label="男" value="male" />
                                            </Picker>
                                        </Form>
                                    </ListItem>
                                </List>
                            </View>
                        </View>
                    </Modal>
                    <Header style={{ backgroundColor: '#fff' }}>
                        <Right>
                            <Button transparent
                                onPress={() => this.setState({ modalVisible: true })}
                            >
                                <Icon type="AntDesign" name='logout' style={{ color: 'gray' }} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <View style={styles.profile}>
                            <View style={styles.profileAlign}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ avatarModal: true })}>
                                    {this.showAvatar()}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.nameGender} onPress={() => this.setState({ profileModal: true })}>
                                    <Text style={styles.nickName}>{nickName}</Text>
                                    {this.checkGender()}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Tabs>
                            <Tab heading="待解决"
                                tabStyle={{ backgroundColor: '#6699CC' }}
                                activeTabStyle={{ backgroundColor: '#6699CC' }}
                            >
                                <OpeningFeedbacks navigation={navigation} />
                            </Tab>
                            <Tab heading="已关闭"
                                tabStyle={{ backgroundColor: '#6699CC' }}
                                activeTabStyle={{ backgroundColor: '#6699CC' }}
                            >
                                <ClosedFeedbacks navigation={navigation} />
                            </Tab>
                        </Tabs>
                    </Content>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F5F5F5'
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingBottom: 40,
        marginTop: 0
    },
    profileAlign: {
        alignItems: 'center'
    },
    nickName: {
        paddingLeft: 20
    },
    nameGender: {
        flexDirection: 'row',
        paddingTop: 5
    },
    male: {
        color: '#0085FF',
        fontSize: 18,
        marginLeft: 5
    },
    female: {
        color: '#FF69B4',
        fontSize: 18,
        marginLeft: 5
    },
    divide: {
        height: .8,
        backgroundColor: '#c4c4c4'
    },
    tab: {
        height: 40,
        backgroundColor: '#fff'
    },
    tabAlign: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10
    },
    text: {
        color: '#2C71FF',
        fontSize: 15
    },
    number: {
        color: '#2C71FF',
        fontSize: 15,
        paddingLeft: 5
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        borderRadius: 10,
        width: 250,
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    closeBtn: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        margin: -15,
        paddingRight: 7
    },
    avatarModal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5
    },
    profileView: {
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        width: 300
    },
    closeProfile: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingRight:15
    }
})
