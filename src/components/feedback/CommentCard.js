import React from 'react'
import { Text, Left, Body, Card, CardItem, Thumbnail } from 'native-base'
import { StyleSheet, View } from 'react-native'

const CommentCard = ({name, month, hours, content}) => {
    return (
        <Card transparent>
            <CardItem>
                <Left>
                    <Thumbnail square small source={require('../../images/defaultAvatar.jpg')} />
                    <Body>
                        <Text>{name}</Text>
                        <Text note>{`${month}   ${hours}`}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Text style={styles.commentContent}>
                    {content}
                </Text>
            </CardItem>
            <View style={styles.divider} />
        </Card>
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: '#c4c4c4'
    },
    commentContent: {
        color: '#2c2c2c',
        marginLeft: 45,
        marginTop: -10
    }
})

export default CommentCard
