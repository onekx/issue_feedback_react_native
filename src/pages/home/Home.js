import React, { Component } from 'react'
import { Container, Content, Header, Fab, Icon, Left, Body, Right, Thumbnail, Text, Button } from 'native-base'
import { Image, DeviceEventEmitter, StyleSheet, View, Modal, TouchableOpacity } from 'react-native'
import ProductList from '../../components/ProductList'
import Request from '../../api/Request'
import DeviceStorage from '../../utils/DeviceStorage'

export default class Home extends Component {
    state = {
        count: 0,
        feedbackArr: [],
        userId: '',
        nickName: '',
        avatar: '',
        gender: 1,
        modalVisible: false
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }

    componentDidMount() {
        this.getProfile()
        this.refresh = DeviceEventEmitter.addListener('refresh', (value)=>{
            if(value) this.setState({count: 0})
        })
    }

    componentWillUnmount() {
        this.refresh.remove()
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

    logoutAccount = () => {
        const { navigation } = this.props
        DeviceStorage.delete('token')
        DeviceStorage.delete('user_id')
        navigation.navigate('login')
    }

    render() {
        const { nickName } = this.state
        const { navigation } = this.props
        console.disableYellowBox = true
        return(
            <Container>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("弹窗将关闭");
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text style={{alignSelf: 'center'}}>确认退出？</Text>
                            <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                            <TouchableOpacity
                                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                            >
                                <Text>否</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('login')}
                            >
                                <Text>是</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Header style={{backgroundColor: '#FFF'}}>
                    <Left>
                        <Button transparent
                            onPress={() => navigation.navigate("profile")}
                        >
                            <Thumbnail square small source={require('../../images/defaultAvatar.jpg')} />
                        </Button>
                    </Left>
                    <Body>
                        <View style={{flexDirection: 'row'}}>
                            <Text>{nickName}</Text>
                            {this.checkGender()}
                        </View>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => this.setModalVisible(true)}
                        >
                            <Icon type="AntDesign" name='logout' style={{color: 'gray'}} />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    <Image source={ require('../../images/home.jpg') } 
                        style={{ width: 340, height: 125, borderRadius: 10,marginBottom: 20 }} 
                    />
                    <ProductList navigation={navigation} />
                </Content>
                <Fab
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={()=>navigation.navigate('submitFeedback')}
                >
                    <Icon type="FontAwesome" name="pencil" />
                </Fab>
            </Container>
        )
  }  
}

const styles = StyleSheet.create ({
    male: {
        color: '#0085FF',
        fontSize: 18,
        marginLeft: 5
    },
    female: {
        color: '#FF69B4',
        fontSize: 18,
        marginLeft: 5
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        borderRadius: 10,
        width: 250,
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    }
})
