import React, { Component } from 'react'
import { Container, Content, Tab, Tabs, Form, Text } from 'native-base'
import { StyleSheet, Picker } from 'react-native'
import ClosedFeedback from '../admin/ClosedFeedback'
import OpeningFeedback from '../admin/OpeningFeedback'
import AdminHeader from '../../components/AdminHeader'
import { products, feedbacks } from '../../api/RequestFactory'

class ManageFeedback extends Component {
    state = {
        selected: 0,
        productsName: [],
        productsId: [],
        issuesArr: []
    }

    onValueChange = (value) => {
        this.setState({
            selected: value,
            issuesArr: []
        })
    }

    getProducts = async () => {
        const res = await products()
        const nameArr = res.result.products.map(value => (value.name))
        const idArr = res.result.products.map(value => (value.product_id))
        this.setState({
            productsName: nameArr,
            productsId: idArr
        })
    }

    getIssues = async () => {
        const { productsId, selected } = this.state
        const id = productsId[selected]
        if (id != undefined) {
            const res = await feedbacks(id)
            this.setState({issuesArr: res.result.issues})
        }
    }

    _renderItems = () => {
        const { productsName } = this.state
        const names = []
        productsName.forEach((name, index) => {
            names.push(<Picker.Item label={name} value={index} />)
        })
        return names
    }

    _renderIssues = () => {
        const { issuesArr } = this.state
        const { navigation } = this.props
        const currentIssues = []
        issuesArr.forEach(value => {
            currentIssues.push(
                <OpeningFeedback
                    time={value.created_at}
                    name={value.owner.nickname}
                    title={value.title}
                    navigation={navigation}
                    issueId={value.issue_id}
                />
            )
        })
        return currentIssues
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        const { navigation } = this.props
        const { selected, issuesArr } = this.state
        console.disableYellowBox = true
        if(issuesArr.length === 0) this.getIssues()
        return (
            <Container>
                <AdminHeader title="管理反馈" navigation={navigation} />
                <Content>
                    <Form style={{ alignItems: 'center', backgroundColor: '#336699' }}>
                        <Picker
                            note
                            mode="dialog"
                            style={styles.picker}
                            selectedValue={selected}
                            onValueChange={this.onValueChange}
                        >
                            {this._renderItems()}
                        </Picker>
                    </Form>
                    <Tabs>
                        <Tab heading="待解决"
                            tabStyle={{ backgroundColor: '#336699' }}
                            activeTabStyle={{ backgroundColor: '#336699' }}

                        >
                            {this._renderIssues()}
                        </Tab>
                        <Tab heading="已关闭"
                            tabStyle={{ backgroundColor: '#336699' }}
                            activeTabStyle={{ backgroundColor: '#336699' }}
                        >
                            <ClosedFeedback />
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        width: 120,
        color: '#fff',
        marginLeft: 45
    }
})

export default ManageFeedback
