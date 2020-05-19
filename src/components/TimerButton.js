import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../assets/css/LoginRegister';

export default class TimerButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount,
            timerTitle: '获取验证码',
            counting: false,
            selfEnable: true,
        };
    }

    countDownAction = () => {
        const { timerCount } = this.state
        const codeTime = timerCount;
        this.interval = setInterval(() => {
            const timer = timerCount - 1
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
        const {textColor, buttonOpacity} = this.props
        const {counting, timerTitle, selfEnable} = this.state
        return (
            <TouchableOpacity 
                activeOpacity={ counting ? 1 : buttonOpacity } 
                onPress={() => {
                    if (!counting && selfEnable) {
                        this.setState({selfEnable: false})
                        this.shouldStartCountting(true)
                    }
                }}
            >
                <View style={styles.validateButton}>
                    <Text
                        style={{color: ((!counting && selfEnable) ? textColor : '#c4c4c4')}}>
                        {timerTitle}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
