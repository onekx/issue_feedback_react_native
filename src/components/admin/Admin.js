import React, { Component } from 'react'
import { Container, Header, Body, Button, Segment, Content, Text } from 'native-base'
import CreateProduct from './CreateProduct'
import Feedbacks from './Feedbacks'

export default class Admin extends Component {
    state = {
        activeComponent: 'feedbacks'
    }

    selectComponent = (activeComponent) => () => this.setState({activeComponent})

    renderComponent = () => {
        const { activeComponent } = this.state
        if (activeComponent === 'feedbacks')
            return <Feedbacks />
        else 
            return <CreateProduct />       
    }

    render() {
        const { activeComponent } = this.state
        return(
            <Container>
                <Header hasSegment>
                <Body>
                    <Segment>
                        <Button first 
                            active={activeComponent === 'feedbacks'}
                            onPress={this.selectComponent('feedbacks')}
                        >
                            <Text>最近反馈</Text>
                        </Button>
                        <Button last
                            active={activeComponent === 'product'}
                            onPress={this.selectComponent('product')}
                        >
                            <Text>创建产品</Text>
                        </Button>
                    </Segment>
                </Body>
                </Header>
                <Content>
                    {this.renderComponent()}
                </Content>
            </Container>
        )
    }
}