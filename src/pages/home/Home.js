import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import { Image, StyleSheet } from 'react-native'
import ProductList from '../../components/home/ProductList'
import WriteButton from '../../components/feedback/WriteButton'

export default class Home extends Component {
    state = {
        count: 0,
        feedbackArr: [],
    }

    render() {
        const { navigation } = this.props
        console.disableYellowBox = true
        return (
            <Container>
                <Content padder>
                    <Image source={require('../../images/home.jpg')} style={styles.image} />
                    <ProductList navigation={navigation} />
                </Content>
                <WriteButton navigation={navigation} />
            </Container >
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 340,
        height: 125,
        borderRadius: 10,
        marginBottom: 20
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
