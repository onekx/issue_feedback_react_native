import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import Request from '../../api/Request'
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

    loginAccount = () => {
        const { email, password } = this.state
        const data = {
            "account_id": email,
            "password": password
        }
        Request('/login', data, 'post')
            .then(res => {
                if(res.ok) {
                    DeviceStorage.save("token", res.result.token)
                    DeviceStorage.save("user_id", res.result.user_id)
                    this.judgeRole(res.result.role_id)
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
            this.loginAccount()
        }
    }

    render() {
        const { navigation } = this.props
        const { email, password } = this.state
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
                            value={email}
                        />
                    </View>
                    <View style={styles.divide}/>
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
                            value={password}
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
                                    navigation.navigate('registration')
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
    divide: {
        height: 1,
        backgroundColor:'#c4c4c4'
    }
})

export default Login