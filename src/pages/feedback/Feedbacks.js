import React, { Component } from 'react'
import { Container, Header, Title, Content, Fab, Button, Left, Right, Body, Icon, Text, Spinner } from 'native-base'
import Request from '../../api/Request'
import FeedbackCard from '../../components/FeedbackCard'

class Feedbacks extends Component {
    state = {
        feedbackArr: [],
        hidden: true
    }

    componentDidMount() {
        this.getFeedbacks()
    }

    // 获取该产品下的所有反馈
    getFeedbacks = () => {
        const { productId } = this.props.route.params
        const url = `/issue/product/${productId}?status=opening`
        Request(url)
            .then(res => {
                if (res.ok) {
                    this.setState({
                        feedbackArr: res.result.issues,
                        hidden: false
                    })
                } else console.log(res)
            })
    }

    //判断反馈数是否为零，是 返回文本，否 则返回反馈列表
    checkFeedbackArr = () => {
        const { feedbackArr } = this.state
        const { navigation } = this.props
        const content = []
        if (feedbackArr.length === 0) {
            return (
                <Text style={{paddingTop: 20,paddingLeft: 20,color:'#A9A9A9'}}>
                    暂时还没有反馈
                </Text>
            )
        } else {
            feedbackArr.forEach(value => {
                content.push(
                    <FeedbackCard
                        description={value.description}
                        time={value.created_at}
                        issueId={value.issue_id}
                        userName={value.owner.nickname}
                        likes={value.likes}
                        dislikes={value.dislikes}
                        navigation={navigation}
                    />
                )
            })
            return content
        }
    }

    //数据正在请求时显示加载符号，请求完成显示反馈列表
    _renderFeedbacks = () => {
        const { hidden } = this.state
        if (hidden) {
            return (
                <Spinner color='blue' />
            )
        } else {
            const allFeedback = this.checkFeedbackArr()
            return allFeedback
        }
    }

    render() {
        const { productName } = this.props.route.params
        const { navigate } = this.props.navigation
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => navigate('home')}>
                            <Icon type="AntDesign" name='arrowleft' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{productName}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {this._renderFeedbacks()}
                </Content>
                <Fab
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => navigate('submitFeedback')}
                >
                    <Icon type="FontAwesome" name="pencil" />
                </Fab>
            </Container>
        )
    }
}

export default Feedbacks
