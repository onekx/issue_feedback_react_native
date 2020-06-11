import React from 'react'
import { Card, CardItem, Text, Icon, Right, Left } from 'native-base'
import { StyleSheet } from 'react-native'
import moment from 'moment'

const ClosedFeedback = ({ name, time, title, navigation, issueId, status }) => {
    const getLocalTime = (time) => {
        const localTime = moment.utc(time).toDate()
        const md = moment(localTime).format('M月D日')
        const hm = moment(localTime).format('H:mm')
        return {
            month: md,
            hours: hm
        }
    }

    const checkStatus = (nowStatus) => {
        if (nowStatus === 'opening')
            return <Icon type="FontAwesome" name="exclamation-circle" style={styles.openColor} />
        else
            return <Icon type="FontAwesome" name="check-circle-o" style={styles.closedColor} />
    }

    return (
        <Card transparent style={styles.cardBorder}>
            <CardItem>
                {checkStatus(status)}
                <Left>
                    <Text style={styles.textColor}>{name}</Text>
                </Left>
                <Right>
                    <Text style={styles.textColor}>{getLocalTime(time).month}</Text>
                    <Text style={styles.textColor}>{getLocalTime(time).hours}</Text>
                </Right>
            </CardItem>
            <CardItem button onPress={() => navigation.navigate('adminFeedbackDetail', { issueId: issueId })}>
                <Text style={styles.textMargin}>{title}</Text>
            </CardItem>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardBorder: {
        borderBottomWidth: .9,
        borderBottomColor: '#c4c4c4'
    },
    openColor: {
        color: '#28a745'
    },
    closedColor: {
        color: '#cb2431'
    },
    textColor: {
        color: '#586069'
    },
    textMargin: {
        marginTop: -17
    }
})

export default ClosedFeedback
