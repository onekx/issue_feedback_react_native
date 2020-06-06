import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { login } from '../../api/RequestFactory'
import AccountButton from '../../components/AccountButton'
import DeviceStorage from '../../utils/DeviceStorage'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    clearInput = () => {
        this.setState({
            email: '',
            password: ''
        })
    }

    judgeRole = (role) => {
        const { navigation } = this.props
        switch (role) {
            case 'MANAGER':
                this.clearInput()
                navigation.navigate('adminNavigation')
                break;
            case 'DEVELOPER':
                this.clearInput()
                navigation.navigate('adminNavigation')
                break;
            default:
                this.clearInput()
                navigation.navigate('home')
        }
    }

    storageToken = (token, userId) => {
        DeviceStorage.save("token", token)
        DeviceStorage.save("user_id", userId)
    }

    loginAccount = async () => {
        const { email, password } = this.state
        const data = {
            "account_id": email,
            "password": password
        }
        const res = await login(data)
        if (res.ok) {
            this.storageToken(res.result.token, res.result.user_id)
            this.judgeRole(res.result.role_id)
        } else Alert.alert(res.message)
    }

    checkInput = () => {
        const { email, password } = this.state
        if (email == '' || password == '') Alert.alert('提示：', '密码或邮箱不能为空！')
        else this.loginAccount()
    }

    render() {
        const { navigation } = this.props
        const { email, password } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <View style={styles.userName}>
                        <TextInput
                            style={styles.edit}
                            placeholder="输入邮箱"
                            placeholderTextColor="#c4c4c4"
                            onChangeText={value => this.setState({ email: value })}
                            value={email}
                        />
                    </View>
                    <View style={styles.divide} />
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="输入密码"
                            placeholderTextColor="#c4c4c4"
                            secureTextEntry={true}
                            onChangeText={value => this.setState({ password: value })}
                            value={password}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.login}
                        onPress={() => this.checkInput()}
                    >
                        <Text style={styles.text}>登录</Text>
                    </TouchableOpacity>
                    <AccountButton
                        navigation={navigation}
                        route={'registration'}
                        text={'注册'}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    editContainer: {
        margin: 30,
    },
    userName: {
        flexDirection: 'row',
        marginTop: 100,
        height: 45,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    validateButton: {
        marginTop: 10,
        paddingRight: 5
    },
    passWord: {
        height: 48,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    edit: {
        height: 40,
        fontSize: 13,
        backgroundColor: '#fff',
        paddingLeft: 15,
    },
    login: {
        marginTop: 15,
        height: 35,
        backgroundColor: '#0085FF',
        borderRadius: 3,

    },
    text: {
        fontSize: 15,
        color: '#fff',
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 3,
        fontWeight: 'normal'
    },
    divide: {
        height: 1,
        backgroundColor: '#c4c4c4'
    }
})

export default Login
