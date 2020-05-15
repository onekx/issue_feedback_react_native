import React, { Component } from 'react';
import { View, Text, TextInput, PixelRatio, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/css/LoginRegister';
import Request from '../api/Request';

const url = 'http://192.168.154.131:8923/v1/login'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    loginAccount = () => {
        const { navigation } = this.props
        const { email } = this.state
        const { password } = this.state
        const data = {
            "account_id": email,
            "password": password
        }
        Request(url, data, 'post')
            .then(res => {
                if(res.ok) {
                    navigation.navigate('主页')
                } else {
                    const error = res.error_type == undefined ? '邮箱格式错误！' : res.message
                    Alert.alert(error)
                }
            })
    }

    checkInput = () => {
        const { email } = this.state
        const { password } = this.state
        if (email == '' || password == '') {
            Alert.alert('提示：','密码或邮箱不能为空！')
        } else {
            this.loginAccount()
        }
    }

    render() {
        const { navigation } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <View style={styles.userName}>
                        <TextInput
                            style={styles.edit}
                            placeholder="输入邮箱"
                            placeholderTextColor="#c4c4c4"
                            onChangeText = {value => {
                                this.setState({
                                    email: value
                                })
                            }}
                        />
                    </View>
                    <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="输入密码"
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
                        <Text style={styles.text}>登录</Text> 
                    </TouchableOpacity>
                    <View style={styles.registWord}>
                        <View>
                            <Text>没有账号？</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate('注册')
                                }}
                            >
                                <Text style={{color: '#0085FF'}}>立即注册</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login