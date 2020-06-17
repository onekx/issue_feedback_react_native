import React, { Component } from 'react'
import { Container, Content, ListItem, Label, Left, Input, Right, Item, Form, Picker } from 'native-base'
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { submit, products } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import HeaderModel from '../../components/common/HeaderModel'

export default class SubmitFeedback extends Component {
    state = {
        selected: 0,
        productsName: [],
        productsId: [],
        title: '',
        description: ''
    }

    onValueChange = (value) => this.setState({selected: value})

    getProducts = async () => {
        const res = await products()
        const nameArr = res.result.products.map(value => (value.name))
        const idArr = res.result.products.map(value => (value.product_id))
        this.setState({
            productsName: nameArr,
            productsId: idArr
        })
    }

    _renderItems = () => {
        const { productsName } = this.state
        const names = []
        productsName.forEach((name, index) => {
            names.push(<Picker.Item label={name} value={index} />)
        })
        return names
    }

    _submit = async () => {
        const { productsId, title, description, selected } = this.state
        const { navigation } = this.props
        const id = await DeviceStorage.get('user_id')
        const data = {
            "product_id": productsId[selected],
            "owner_id": id,
            "title": title,
            "description": description
        }
        const res = await submit(data)
        if (res.ok) {
            navigation.goBack()
        } else Alert.alert('提交失败!')
    }

    render() {
        const { productsName, selected } = this.state
        const { navigation } = this.props
        console.disableYellowBox = true
        if (productsName.length === 0) this.getProducts()
        return (
            <Container>
                <Content>
                    <HeaderModel navigation={navigation} title={'提交反馈'} />
                    <ListItem>
                        <Left>
                            <Text style={styles.leftTitle}>选择产品:</Text>
                        </Left>
                        <Right style={{ marginRight: 10 }}>
                            <Picker
                                note
                                mode="dialog"
                                style={{ width: 130 }}
                                selectedValue={selected}
                                onValueChange={this.onValueChange}
                            >
                                {this._renderItems()}
                            </Picker>
                        </Right>
                    </ListItem>
                    <View style={styles.divider} />
                    <Form>
                        <Item stackedLabel>
                            <Label>标题</Label>
                            <Input onChangeText={value => {
                                this.setState({
                                    title: value
                                })
                            }}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>描述</Label>
                            <Input onChangeText={value => {
                                this.setState({
                                    description: value
                                })
                            }}
                            />
                        </Item>
                    </Form>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.createButton}
                            onPress={this._submit}
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
        backgroundColor: '#c4c4c4'
    },
    leftTitle: {
        marginLeft: -3,
        color: '#575757'
    }
})
