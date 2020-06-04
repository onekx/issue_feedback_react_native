import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Spinner } from 'native-base'
import Request from '../api/Request'

const colors = [
    '#FFB6C1',
    '#6495ED',
    '#5F9EA0',
    '#40E0D0',
    '#FFA07A',
    '#FA8072',
    '#DAA520',
    '#CC9999',
    '#666666',
    '#CCCC00'
]

class ProductList extends Component {
    state = {
        products: [],
        hidden: true
    }

    // 请求获取所有产品
    getProducts = () => {
        Request('/products')
            .then(res => {
                if (res.ok) this.setState({
                    products: res.result.products,
                    hidden: false
                })
                else console.log(res)
            })
    }

    // 返回保存所有产品的数组
    productsList = () => {
        const { navigation } = this.props
        const { products } = this.state
        const content = []
        products.forEach((product, index) => {
            content.push(
                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={() => navigation.navigate('feedbacks',
                        {
                            productId: product.product_id,
                            productName: product.name
                        }
                    )}>
                    <View style={[styles.product, { backgroundColor: colors[index] }]}>
                        <Text style={styles.textcolor}>
                            {product.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return content
    }

    // 判断请求是否完成
    _renderProducts = () => {
        const { hidden } = this.state
        if (hidden) {
            return (
                <Spinner color='blue' />
            )
        } else {
            const productArr = this.productsList()
            return productArr
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderProducts()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    product: {
        width: 300,
        height: 50,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    textcolor: {
        color: '#fff'
    }
})

export default ProductList
