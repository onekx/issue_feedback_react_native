import React, { Component } from 'react';
import { View, Text, TextInput, PixelRatio, Button, TouchableOpacity } from 'react-native';
import styles from '../assets/css/LoginRegister';

class Register extends Component {
    render() {
        const { navigation } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <View style={styles.userName}>
                        <TextInput
                            style={styles.edit}
                            placeholder="请输入用户名"
                            placeholderTextColor="#c4c4c4"
                        />
                    </View>
                    <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
                    <View style={styles.passWord}>
                        <TextInput
                            style={styles.edit}
                            placeholder="请输入密码"
                            placeholderTextColor="#c4c4c4"
                            secureTextEntry={true}
                        />
                    </View>
                    
                    <TouchableOpacity
                        style={styles.login}
                        onPress={()=>{
                            navigation.navigate('登录')
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