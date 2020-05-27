import React from 'react'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Fab, Icon } from 'native-base'
import { Image, View, PixelRatio } from 'react-native'

export default function Home({ navigation }) {
    console.disableYellowBox = true
    return(
        <Container>
            <Content>
                <Image source={ require('../../assets/images/home.jpg') } style={{ width: 345, height: 125, borderRadius: 10, margin: 7 }} />
                <View style={{ height: 1/PixelRatio.get(), backgroundColor:'#808080' }}/>
                
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                    </Left>
                    <Body>
                      <Text>哇哇哈哈</Text>
                      <Text note>下载的视频打不开打打不开打不开打不打不开打不开打不开打不开打不开</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
              </List>
          
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