import React, { Component } from 'react'
import { Container, Content, Form, Item, Input, Label } from 'native-base'
import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native'
import { create } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import AdminHeader from '../../components/AdminHeader'

class CreateProduct extends Component {
    state = {
        productName: '',
        productDes: ''
    }

    clearInput = () => {
        this.setState({
            productName: '',
            productDes: ''
        })
    }

    _createProduct = async () => {
        const { productDes, productName } = this.state
        const id = await DeviceStorage.get("user_id")
        const data = {
            "manager_id": id,
            "name": productName,
            "description": productDes
        }
        const res = await create(data)
        if (res.ok) {
            Alert.alert('创建成功!')
            this.clearInput()
        } else Alert.alert(res.message)
    }

    render() {
        const { navigation } = this.props
        const { productDes, productName } = this.state
        return (
            <Container>
                <AdminHeader title="创建产品" navigation={navigation} />
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>产品名称</Label>
                            <Input onChangeText={value => {
                                this.setState({
                                    productName: value
                                })
                            }}
                                value={productName}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>产品描述</Label>
                            <Input onChangeText={value => {
                                this.setState({
                                    productDes: value
                                })
                            }}
                                value={productDes}
                            />
                        </Item>
                    </Form>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.createButton}
                            onPress={this._createProduct}
                        >
                            <Text style={styles.text}>
                                创建产品
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
        backgroundColor: '#3F51B5',
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
    }
})

export default CreateProduct
