import React, { Component } from 'react'
import { Container, Content, Form, Item, Input, Label, ListItem, List, Separator, Text, Body, Button } from 'native-base'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { create } from '../../api/RequestFactory'
import DeviceStorage from '../../utils/DeviceStorage'
import AdminHeader from '../../components/admin/AdminHeader'
import { products_by_manager, delete_product, update_product } from '../../api/RequestFactory'
import Modal from 'react-native-modal'

let id = ''

class ManageProduct extends Component {
    state = {
        productName: '',
        productDes: '',
        products: [],
        updateName: '',
        updateDes: '',
        modalVisible: false
    }

    clearInput = () => {
        this.setState({
            productName: '',
            productDes: '',
            updateName: '',
            updateDes: ''
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

    // 保存正在处理的产品 id
    currentId = (productId) => {
        id = productId
    }

    updateProduct = async () => {
        const { updateName, updateDes } = this.state
        const productID = id
        const userId = await DeviceStorage.get("user_id")
        const data = {
            "manager_id": userId,
            "name": updateName,
            "description": updateDes
        }
        const res = await update_product(productID, data)
        if (res.ok) {
            this.clearInput()
            this.setState({ modalVisible: false })
            this.getProducts()
        } else console.log(res)
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
                    <Button transparent onPress={() => this.setState({
                        modalVisible: true
                    }, this.currentId(item.product_id))}>
                        <Text>修改</Text>
                    </Button>
                    <Button transparent onPress={() => this.deleteProduct(item.product_id)}>
                        <Text>删除</Text>
                    </Button>
                </ListItem>
            )
        })
        return productsList
    }

    createProduct = async () => {
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
        const { productDes, productName, modalVisible, updateDes, updateName } = this.state
        return (
            <Container>
                <AdminHeader title="管理产品" navigation={navigation} />
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>产品名称</Label>
                            <Input value={productName}
                                onChangeText={value => this.setState({ productName: value })}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>产品描述</Label>
                            <Input value={productDes}
                                onChangeText={value => this.setState({ productDes: value })}
                            />
                        </Item>
                    </Form>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.TouchButton}
                            onPress={() => this.createProduct()}
                        >
                            <Text style={styles.text}>创建产品</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        isVisible={modalVisible}
                        onBackdropPress={() => this.setState({ modalVisible: !modalVisible })}
                    >
                        <View style={{ backgroundColor: '#fff' }}>
                            <Form>
                                <Item stackedLabel>
                                    <Label>产品名称</Label>
                                    <Input value={updateName}
                                        onChangeText={value => this.setState({ updateName: value })}
                                    />
                                </Item>
                                <Item stackedLabel last>
                                    <Label>产品描述</Label>
                                    <Input value={updateDes}
                                        onChangeText={value => this.setState({ updateDes: value })}
                                    />
                                </Item>
                            </Form>
                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    style={styles.TouchButton}
                                    onPress={() => this.updateProduct()}
                                >
                                    <Text style={styles.text}>修改</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
        marginBottom: 10
    },
    TouchButton: {
        marginTop: 15,
        height: 35,
        backgroundColor: '#0099CC',
        borderRadius: 5,
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
