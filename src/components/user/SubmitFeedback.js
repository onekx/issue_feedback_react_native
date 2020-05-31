import React, { Component } from 'react'
import { Container, Content, ListItem, Label, Left, Input, Right, Item, Form, Picker } from 'native-base'
import { View, TouchableOpacity, Text, StyleSheet, Alert, DeviceEventEmitter } from 'react-native'
import Request from '../../api/Request'
import DeviceStorage from '../DeviceStorage'

export default class SubmitFeedback extends Component {
    state = {
        selected: 0,
        productsName: [],
        productsId: [],
        title: '',
        description: ''
      }

    onValueChange = (value) => {
      this.setState({
        selected: value
      })
    }

    getProducts = () => {
        Request('/products')
        .then(res=>{
            const nameArr = res.result.products.map(value=>(value.name))
            const idArr = res.result.products.map(value=>(value.product_id))
            this.setState({
                productsName: nameArr,
                productsId: idArr
            })
        })
    }

    _renderItems = () => {
        const { productsName } = this.state
        const names = []
        productsName.forEach((name, index)=>{
            names.push(<Picker.Item label={name} value={index} />)
        })
        return names
    }

    submit = async () => {
        const { productsId, title, description, selected } = this.state
        const { navigate } = this.props.navigation
        const id = await DeviceStorage.get('user_id')
        const data = {
            "product_id": productsId[selected],
            "owner_id": id,
            "title": title,
            "description": description
        }
        Request('/issue', data, 'post')
        .then(res=> {
            if (res.ok) {
                navigate('主页')
                DeviceEventEmitter.emit('refresh',true)
            }
            else Alert.alert('提交失败!')
        })
    }

    render() {
        const { productsName, selected } = this.state
        if (productsName.length === 0) this.getProducts()
        return(
            <Container>
            <Content>
                <ListItem>
                    <Left>
                        <Text style={styles.leftTitle}>选择产品:</Text>
                    </Left>
                    <Right style={{marginRight: 10}}>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: 130 }}
                            selectedValue={selected}
                            onValueChange={this.onValueChange}
                        >
                            {this._renderItems()}
                        </Picker>
                    </Right>
                </ListItem>
                <View style={styles.divider}/>
                <Form>
                    <Item stackedLabel>
                        <Label>标题</Label>
                        <Input onChangeText = {value => {
                                this.setState({
                                    title: value
                                })
                        }}
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>描述</Label>
                        <Input onChangeText = {value => {
                                this.setState({
                                    description: value
                                })
                        }}
                        />
                    </Item>
                </Form>
                <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.createButton}
                            onPress={this.submit}
                        >
                            <Text style={styles.text}>
                                提交反馈
                            </Text>
                        </TouchableOpacity>
                    </View>
            </Content>
          </Container>
        )
    }
}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    createButton: {
        marginTop: 15,
        height: 35,
        backgroundColor: '#0085FF',
        borderRadius: 3,
        width: 250
    },
    text: {
        fontSize: 15,
        color: '#fff',
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 3,
        fontWeight: 'normal'
    },
    divider: {
        height: .5,
        backgroundColor:'#c4c4c4'
    },
    leftTitle: {
        marginLeft: -3,
        color: '#575757'
    }
})
