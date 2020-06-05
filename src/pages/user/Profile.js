import React, { Component } from 'react'
import { Alert, Picker } from 'react-native'
import { get_profile, update_profile } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import {
    Container, Header, Content, List, ListItem, Text,
    Input, Button, Left, Body, Icon, Title, Form
} from 'native-base'

export default class Profile extends Component {
    state = {
        nickName: '',
        gender: 1,
        selected: "female",
        inputNickname: ''
    }

    getProfile = async () => {
        const userId = await DeviceStorage.get("user_id")
        const res = await get_profile(userId)
        this.setState({
            nickName: res.result.nickname,
            gender: res.result.gender
        })
        if (this.state.gender === 0)
            this.setState({ selected: 'male' })
    }

    setNickName = async () => {
        const { inputNickname } = this.state
        const userId = await DeviceStorage.get("user_id")
        const data = { "nickname": inputNickname }
        const res = await update_profile(userId, data)
        res.ok ? Alert.alert('修改成功！')
            : Alert.alert('修改失败！')
    }

    setGender = async (value) => {
        this.setState({ selected: value })
        const userId = await DeviceStorage.get("user_id")
        const data = { "gender": 1 }
        if (this.state.selected === 'male') data.gender = 0
        const res = await update_profile(userId, data)
        res.ok ? Alert.alert('修改成功！')
            : Alert.alert('修改失败！')
    }

    componentDidMount() {
        this.getProfile()
    }

    render() {
        const { navigate } = this.props.navigation
        const { selected, nickName } = this.state
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => navigate('home')}
                        >
                            <Icon type="AntDesign" name='arrowleft' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>编辑资料</Title>
                    </Body>
                </Header>
                <Content>
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
                                onPress={() => this.setNickName()}
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
                                    onValueChange={this.setGender}
                                >
                                    <Picker.Item label="女" value="female" />
                                    <Picker.Item label="男" value="male" />
                                </Picker>
                            </Form>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}
