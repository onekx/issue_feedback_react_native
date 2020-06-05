import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import Request from '../api/Request'
import DeviceStorage from '../utils/DeviceStorage'

export default class TimerButton extends Component {
    state = {
        timerCount: this.props.timerCount,
        timerTitle: '获取验证码',
        counting: false,
        selfEnable: true,
    }

    // 获取验证码
    getCaptcha = () => {
        const { email, acceptable } = this.props
        const serverUrl = 'http://192.168.154.131:8923/service/v1/account/send_code'
        const data = {"account_id": email}
        if (acceptable) {
            fetch(serverUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => (res.json()))
                .then(res => {
                    if (res.ok) {
                        console.log(res.result.validate_code)
                        DeviceStorage.save("validate_token", res.result.validate_token)
                    } else Alert.alert('请检查输入是否正确！')
                })
        }
    }

    countDownAction = () => {
        const { timerCount } = this.state
        const codeTime = timerCount
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1
            if (timer === 0) {
                this.interval && clearInterval(this.interval)
                this.setState({
                    timerCount: codeTime,
                    timerTitle: '获取验证码',
                    counting: false,
                    selfEnable: true
                })
            } else {
                this.setState({
                    timerCount: timer,
                    timerTitle: `重新获取(${timer}s)`
                })
            }
        }, 1000)
    }

    shouldStartCountting = (shouldStart) => {
        if (shouldStart) {
            this.countDownAction()
            this.setState({
                counting: true,
                selfEnable: false
            })
        } else {
            this.setState({
                selfEnable: true
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { textColor, buttonOpacity, acceptable } = this.props
        const { counting, timerTitle, selfEnable } = this.state
        return (
            <TouchableOpacity
                activeOpacity={counting ? 1 : buttonOpacity}
                onPress={() => {
                    if (!counting && selfEnable && acceptable) {
                        this.setState({ selfEnable: false })
                        this.shouldStartCountting(true)
                    }
                    this.getCaptcha()
                }}
            >
                <View style={{ marginTop: 10, paddingRight: 5 }}>
                    <Text
                        style={{ color: ((!counting && selfEnable) ? textColor : '#c4c4c4') }}>
                        {timerTitle}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
