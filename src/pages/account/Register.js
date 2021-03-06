import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { register } from '../../api/RequestFactory'
import TimerButton from '../../components/account/TimerButton'
import AccountButton from '../../components/account/AccountButton'
import DeviceStorage from '../../utils/DeviceStorage'

class Register extends Component {
    state = {
        email: '',
        password: '',
        validateCode: '',
        textColor: '#c4c4c4',
        timerCount: 180,
        opacity: 1,
        acceptable: false
    }

    checkEmail = () => {
        const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
        const { email } = this.state
        let isRight = reg.test(email)
        if (isRight) this.setState({
            textColor: '#0085FF',
            opacity: 0.2,
            acceptable: true
        })
        else this.setState({
            textColor: '#c4c4c4',
            opacity: 1,
            acceptable: false
        })
    }

    registerAccount = async () => {
        const { navigation } = this.props
        const { email, password, validateCode } = this.state
        const token = await DeviceStorage.get("validate_token")
        const data = {
            "account_id": email,
            "password": password,
            "validate_token": token,
            "validate_code": validateCode
        }
        const res = await register(data)
        res.ok ? navigation.navigate('login')
            : Alert.alert(res.message)
    }

    checkInput = () => {
        const { password, validateCode } = this.state
        if (validateCode == '' || password == '') Alert.alert('提示：', '验证码或密码不能为空！')
        else this.registerAccount()
    }

    render() {
        const { navigation } = this.props
        const { textColor, opacity, email, password, acceptable } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <View style={styles.userName}>
                        <TextInput
                            style={styles.edit}
                            placeholder="邮箱"
                            placeholderTextColor="#c4c4c4"
                            onChangeText={value => {
                                this.setState({ email: value })
                                this.checkEmail()
                            }}
                        />
                        <TimerButton
                            timerCount={180}
                            textColor={textColor}
                            buttonOpacity={opacity}
                            email={email}
                            password={password}
                            acceptable={acceptable}
                        />
                    </View>
                    <View style={styles.divide1} />
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="验证码"
                            placeholderTextColor="#c4c4c4"
                            onChangeText={value => this.setState({ validateCode: value })}
                        />
                    </View>
                    <View style={styles.divide2} />
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="密码"
                            placeholderTextColor="#c4c4c4"
                            secureTextEntry={true}
                            onChangeText={value => this.setState({ password: value })}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.login}
                        onPress={() => this.checkInput()}
                    >
                        <Text style={styles.text}>注册</Text>
                    </TouchableOpacity>
                    <AccountButton
                        navigation={navigation}
                        route={'login'}
                        text={'登录'}
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
    divide1: {
        height: .5,
        backgroundColor: '#c4c4c4'
    },
    divide2: {
        height: 1,
        backgroundColor: '#c4c4c4'
    }
})

export default Register
