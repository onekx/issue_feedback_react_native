import React, { Component } from 'react'
import { Container, Content, Form, Item, Input, Label, ListItem, List, Separator, Text, Left, Right, Body, Button } from 'native-base'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { create } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import AdminHeader from '../../components/AdminHeader'
import { products_by_manager, delete_product } from '../../api/RequestFactory'

class ManageProduct extends Component {
    state = {
        productName: '',
        productDes: '',
        products: []
    }

    clearInput = () => {
        this.setState({
            productName: '',
            productDes: ''
        })
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
        const id = await DeviceStorage.get("user_id")
        const res = await products_by_manager(id)
        res.ok ? this.setState({ products: res.result.products })
            : console.log(res)
    }

    deleteProduct = async (productId) => {
        const id = await DeviceStorage.get("user_id")
        const data = { "manager_id": id }
        const res = await delete_product(productId, data)
        res.ok ? this.getProducts()
            : console.log(res)
    }

    _renderProducts = () => {
        const { products } = this.state
        const productsList = []
        products.forEach(item => {
            productsList.push(
                <ListItem avatar>
                    <Body>
                        <Text style={styles.proText}>{item.name}</Text>
                        <Text note>{item.description}</Text>
                    </Body>
                    <Button transparent onPress={() => this.deleteProduct(item.product_id)}>
                        <Text>删除</Text>
                    </Button>
                </ListItem>
            )
        })
        return productsList
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
            this.getProducts()
            this.clearInput()
        } else Alert.alert(res.message)
    }

    render() {
        const { navigation } = this.props
        const { productDes, productName } = this.state
        return (
            <Container>
                <AdminHeader title="管理产品" navigation={navigation} />
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
                    <Separator bordered>
                        <Text note>拥有的产品：</Text>
                    </Separator>
                    <List>
                        {this._renderProducts()}
                    </List>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    createButton: {
        marginTop: 15,
        height: 35,
        backgroundColor: '#336699',
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
    proText: {
        color: '#333333',
        fontSize: 15
    }
})

export default ManageProduct
