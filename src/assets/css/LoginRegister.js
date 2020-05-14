import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    editContainer: {
        margin: 30,
    },
    userName: {
        marginTop: 100,
        height: 48,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    passWord: {
        height: 48,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    edit: {
        height: 40,
        fontSize: 13,
        backgroundColor: '#fff',
        paddingLeft: 15,
    },
    login: {
        marginTop: 15,
        height: 35,
        backgroundColor: '#0085FF',
        borderRadius: 3,
        
    },
    text: {
        fontSize: 15,
        color: '#fff',
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 3,
        fontWeight: 'normal'
    },
    registWord: {
        flexDirection: 'row',
        marginTop: 10
    }
})