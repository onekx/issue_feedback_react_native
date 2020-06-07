import React, { Component } from 'react'
import { Card, CardItem, Text, Icon, Right, Left } from 'native-base'
import { StyleSheet } from 'react-native'

class ClosedFeedback extends Component {
    render() {
        return (
            <Card transparent style={styles.cardBorder}>
                <CardItem>
                    <Icon type="FontAwesome" name="exclamation-circle" style={styles.iconColor} />
                    <Left>
                        <Text style={styles.textColor}>onekx</Text>
                    </Left>
                    <Right>
                        <Text style={styles.textColor}>3天前</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Text style={styles.textMargin}>关于软件的BUG</Text>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    cardBorder: {
        borderBottomWidth: .9,
        borderBottomColor: '#c4c4c4'
    },
    iconColor: {
        color: '#28a745'
    },
    textColor: {
        color: '#586069'
    },
    textMargin: {
        marginTop: -17
    }
})

export default ClosedFeedback
