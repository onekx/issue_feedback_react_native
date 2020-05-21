import React from 'react'
import { Container, Content, Text, Thumbnail, Icon } from 'native-base'
import { View, TouchableOpacity } from 'react-native'
import Feedback from './Feedback'
import styles from '../../assets/css/UserStyle'

export default function User() {
    return(
        <Container>
            <Content style={styles.content}>
                <View style={styles.profile}>
                    <View style={styles.profileAlign}>
                        <Thumbnail source={require('../../assets/images/defaultAvatar.jpg')}/>                        
                        <TouchableOpacity style={styles.nameGender}>
                            <Text style={styles.nickName}>昵称</Text>
                            <Icon name="male" style={styles.gender}/>
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
                <Feedback />
            </Content>
        </Container>
    )
}