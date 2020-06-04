import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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
        products: []
    }

    getProducts = () => {
        Request('/products')
            .then(res => {
                if (res.ok) this.setState({
                    products: res.result.products
                })
                else console.log(res)
            })
    }

    _renderProducts = () => {
        const { products } = this.state
        const productArr = []
        products.forEach((product, index) => {
            productArr.push(
                <TouchableOpacity 
                  activeOpacity={.5} 
                  onPress={() => alert('ok')}>
                    <View style={[styles.product,{backgroundColor: colors[index]}]}>
                        <Text style={styles.textcolor}>
                            {product.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return productArr
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
