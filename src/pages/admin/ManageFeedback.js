import React, { Component } from 'react'
import { Container, Content, Tab, Tabs, Form, Text } from 'native-base'
import { StyleSheet, Picker } from 'react-native'
import AdminFeedback from '../../components/admin/AdminFeedback'
import AdminHeader from '../../components/admin/AdminHeader'
import { products, feedbacks, feedbacks_closed } from '../../api/RequestFactory'

class ManageFeedback extends Component {
    state = {
        selected: 0,
        productsName: [],
        productsId: [],
        issuesArr: [],
        closedIssues: [],
        refresh: true
    }

    onValueChange = (value) => {
        this.setState({
            selected: value,
            issuesArr: [],
            refresh: true
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
            const opening = await feedbacks(id)
            const closed = await feedbacks_closed(id)
            this.setState({
                issuesArr: opening.result.issues,
                closedIssues: closed.result.issues,
                refresh: false
            })
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

    _renderIssues = (issues, status) => {
        const { navigation } = this.props
        const currentIssues = []
        if (issues.length === 0) return <Text note style={{marginLeft:20,marginTop:20,color:'#666'}}>暂时没有反馈</Text>
        else {
            issues.forEach(value => {
                currentIssues.push(
                    <AdminFeedback
                        time={value.created_at}
                        name={value.owner.nickname}
                        title={value.title}
                        navigation={navigation}
                        issueId={value.issue_id}
                        status={status}
                    />
                )
            })
            return currentIssues
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        const { navigation } = this.props
        const { selected, refresh, issuesArr, closedIssues } = this.state
        console.disableYellowBox = true
        if (refresh) this.getIssues()
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
                            {this._renderIssues(issuesArr, 'opening')}
                        </Tab>
                        <Tab heading="已关闭"
                            tabStyle={{ backgroundColor: '#336699' }}
                            activeTabStyle={{ backgroundColor: '#336699' }}
                        >
                            {this._renderIssues(closedIssues, 'closed')}
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
