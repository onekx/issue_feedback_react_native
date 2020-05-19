import React, { Component } from 'react';
import { View, Text, TextInput, PixelRatio, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/css/LoginRegister';
import Request from '../api/Request';
import { timing } from 'react-native-reanimated';
import TimerButton from './TimerButton';

class Register extends Component {
    state = {
        email: '',
        password: '',
        textColor: '#c4c4c4',
        timerCount: 180,
        opacity: 1,
        available: false
    }

    checkEmail = () => {
        const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
        const { email } = this.state
        let isRight = reg.test(email)
        if (isRight) {
            this.setState({
                textColor: '#0085FF',
                opacity: 0.2
            })
        } else {
            this.setState({
                textColor: '#c4c4c4',
                opacity: 1
            })
        }
    }

    registerAccount = () => {
        const { navigation } = this.props
        const { email, password } = this.state
        const data = {
            "account_id": email,
            "password": password
        }
        Request('/v1/account', data, 'post')
            .then(res => {
                if(res.ok) {
                    Alert.alert('注册成功！')
                    navigation.navigate('登录')
                } else {
                    const error = res.error_type == undefined ? '邮箱格式错误！' : res.message 
                    Alert.alert(error)
                }
            })
    }

    checkInput = () => {
        const { email, password } = this.state
        if (email == '' || password == '') {
            Alert.alert('提示：','密码或邮箱不能为空！')
        } else {
            this.registerAccount()
        }
    }

    render() {
        const { navigation } = this.props
        const { textColor, opacity } = this.state
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
                        /> 
                        
                    </View>
                    <View style={{height: .5,  backgroundColor:'#c4c4c4'}}/>
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="验证码"
                            placeholderTextColor="#c4c4c4"
                        />
                    </View>
                    <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
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
                                    navigation.navigate('登录')
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

export default Register