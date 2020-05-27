import React, { Component } from 'react'
import { Container, Content, Text, Thumbnail, Icon } from 'native-base'
import { View, TouchableOpacity } from 'react-native'
import UserFeedback from './UserFeedback'
import styles from '../../assets/css/UserStyle'
import Request from '../../api/Request'
import DeviceStorage from '../DeviceStorage'

export default class User extends Component {
    state = {
        userId: '',
        nickName: '',
        avatar: '',
        gender: 1
    }

    getProfile = async () => {
        const userId = await DeviceStorage.get("user_id")
        Request(`/profile/${userId}`)
            .then(res => this.setState({
                nickName: res.result.nickname,
                avatar: res.result.avatar,
                gender: res.result.gender
            }))
    }

    checkGender = () => {
        const { gender } = this.state
        if (gender === 1) {
            return <Icon name="female" style={styles.female}/>
        } else {
            return <Icon name="male" style={styles.male}/>
        }
    }

    render() {
        const { nickName } = this.state
        if (nickName === '') this.getProfile()
        return(
            <Container>
                <Content style={styles.content}>
                    <View style={styles.profile}>
                        <View style={styles.profileAlign}>
                            <Thumbnail source={require('../../assets/images/defaultAvatar.jpg')}/>                        
                            <TouchableOpacity style={styles.nameGender}>
                                <Text style={styles.nickName}>{nickName}</Text>
                                {this.checkGender()}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.divide}/>
                    <View style={styles.tab}>
                        <View style={styles.tabAlign}>
                            <Text style={styles.text}>反馈</Text>
                            <Text style={styles.number}>0</Text>
                        </View>
                    </View>
                    <View style={styles.divide}/>
                    <UserFeedback />
                </Content>
            </Container>
        )
    }
}