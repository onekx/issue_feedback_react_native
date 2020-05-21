import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    content: {
        backgroundColor: '#F5F5F5'
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'center', 
        paddingTop: 20,
        backgroundColor:'#fff',
        paddingBottom: 40
    },
    profileAlign: {
        alignItems: 'center'
    },
    nickName: {
        paddingLeft: 20
    },
    nameGender: {
        flexDirection: 'row',
        paddingTop: 5
    },
    gender: {
        color: '#0085FF',
        fontSize: 18,
        marginLeft: 5
    },
    divide: {
        height: .8,
        backgroundColor:'#c4c4c4'
    },
    tab: {
        height: 40,
        backgroundColor:'#fff'
    },
    tabAlign: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10
    },
    text: {
        color:'#2C71FF',
        fontSize: 15
    },
    number: {
        color:'#2C71FF',
        fontSize: 15,
        paddingLeft: 5
    }
})