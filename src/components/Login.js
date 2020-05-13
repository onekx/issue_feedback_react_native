import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickName: '',
            passWord: ''
        }
    }

    render() {
        const { navigation } = this.props
        return(
            <View>
                <Input
                    placeholder="请输入昵称"
                    onChangeText={value => {
                        this.setState({
                            nickName: value
                        })
                    }}
                />
                <Input
                    placeholder="请输入密码"
                    secureTextEntry={true}
                    onChangeText={value => {
                        this.setState({
                            passWord: value
                        })
                    }}
                />
                <Button 
                    title="登录"
                    type="outline"
                    onPress={()=>{
                        navigation.navigate('主页')
                    }}
                />
                <Button 
                    title="立即注册"
                    type="clear"
                    onPress={()=>{
                        navigation.navigate('注册')
                    }}
                />
            </View>
        )
    }
}

export default Login