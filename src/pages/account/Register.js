import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import Request from '../../api/Request'
import TimerButton from '../../components/TimerButton'
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
        if (isRight) {
            this.setState({
                textColor: '#0085FF',
                opacity: 0.2,
                acceptable: true
            })
        } else {
            this.setState({
                textColor: '#c4c4c4',
                opacity: 1,
                acceptable: false
            })
        }
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
        Request('/account', data, 'post')
            .then(res => {
                if(res.ok) {
                    navigation.navigate('login')
                } else {
                    const error = res.error_type == undefined ? '邮箱格式错误！' : res.message 
                    Alert.alert(error)
                }
            })
    }

    checkInput = () => {
        const { password, validateCode } = this.state
        if (validateCode == '' || password == '') {
            Alert.alert('提示：','验证码或密码不能为空！')
        } else {
            this.registerAccount()
        }
    }

    render() {
        const { navigation } = this.props
        const { textColor, opacity, email, password, acceptable } = this.state
        return(
            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <View style={styles.userName}>
                        <TextInput
                            style={styles.edit}
                            placeholder="邮箱"
                            placeholderTextColor="#c4c4c4"
                            onChangeText = {value => {
                                this.setState({
                                    email: value
                                })
                                this.checkEmail()
                            }}
                        />
                        <TimerButton
                            timerCount = {180}
                            textColor = {textColor}
                            buttonOpacity = {opacity}
                            email = {email}
                            password = {password}
                            acceptable = {acceptable}
                        /> 
                        
                    </View>
                    <View style={styles.divide1}/>
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="验证码"
                            placeholderTextColor="#c4c4c4"
                            onChangeText={value => {
                                this.setState({
                                    validateCode: value
                                })
                            }}
                        />
                    </View>
                    <View style={styles.divide2}/>
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="密码"
                            placeholderTextColor="#c4c4c4"
                            secureTextEntry={true}
                            onChangeText = {value => {
                                this.setState({
                                    password: value
                                })
                            }}
                        />
                    </View>                 
                    <TouchableOpacity
                        style={styles.login}
                        onPress={()=>{
                            this.checkInput()
                        }}
                    >                            
                        <Text style={styles.text}>注册</Text> 
                    </TouchableOpacity>
                    <View style={styles.registWord}>
                        <View>
                            <Text>已有账号？</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate('login')
                                }}
                            >
                                <Text style={{color: '#0085FF'}}>立即登录</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    registWord: {
        flexDirection: 'row',
        marginTop: 10
    },
    divide1: {
        height: .5,
        backgroundColor:'#c4c4c4'
    },
    divide2: {
        height: 1,
        backgroundColor:'#c4c4c4'
    }
})

export default Register
