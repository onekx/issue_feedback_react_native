import React, { Component } from 'react'
import { Container, Content, Fab, Icon } from 'native-base'
import { Image, DeviceEventEmitter } from 'react-native'
import Feedback from './Feedback'
import Request from '../../api/Request'

export default class Home extends Component {
    state = {
        count: 0,
        feedbackArr: []
    }

    componentDidMount() {
        this.refresh = DeviceEventEmitter.addListener('refresh', (value)=>{
            if(value) this.setState({count: 0})
        })
    }

    componentWillUnmount() {
        this.refresh.remove()
    }

    _renderFeedback = () => {
        const { feedbackArr } = this.state
        const arr = []
        feedbackArr.forEach(value => {
            arr.push(
                <Feedback 
                    description={value.description}
                    time={value.created_at}
                    userId={value.owner_id}
                    issueId={value.issue_id}
                />
            )
        })
        return arr
    }

    getFeedbacks = () => {
        const url = '/issue/product/d98431d9-167b-4c34-88a0-be6922777494?status=opening'
        Request(url)
          .then(res=>this.setState({
              count: res.result.count,
              feedbackArr: res.result.issues
          }))
    }

    render() {
        const { count } = this.state
        const { navigation } = this.props
        console.disableYellowBox = true
        if (count === 0) this.getFeedbacks()
        return(
            <Container>
                <Content padder>
                    <Image source={ require('../../assets/images/home.jpg') } 
                        style={{ width: 340, height: 125, borderRadius: 10 }} 
                    />
                    {this._renderFeedback()}
                </Content>
                <Fab
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={()=>navigation.navigate('提交反馈')}
                >
                    <Icon type="FontAwesome" name="pencil" />
                </Fab>
            </Container>
        )
  }  
}
