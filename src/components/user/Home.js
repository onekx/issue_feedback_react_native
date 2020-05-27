import React, { Component } from 'react'
import { Container, Content, Fab, Icon } from 'native-base'
import { Image } from 'react-native'
import Feedback from './Feedback'

export default class Home extends Component {
    render() {
        const { navigation } = this.props
        console.disableYellowBox = true
        return(
            <Container>
              <Content padder>
                  <Image source={ require('../../assets/images/home.jpg') } 
                      style={{ width: 340, height: 125, borderRadius: 10 }} 
                  />
                  <Feedback />
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