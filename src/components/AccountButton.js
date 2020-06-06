import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

const AccountButton = ({navigation, route, text}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>已有账号？</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(route)
                    }}
                >
                    <Text style={styles.text}>{`立即${text}`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10
    },
    text: {
        marginLeft: 5,
        color: '#0085FF'
    }
})

export default AccountButton
