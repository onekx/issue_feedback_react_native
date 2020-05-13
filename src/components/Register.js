import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';

class Register extends Component {
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
                    title="注册"
                    type="outline"
                    onPress={()=>{
                        navigation.navigate('登录')
                    }}
                />
            </View>
        )
    }
}

export default Register