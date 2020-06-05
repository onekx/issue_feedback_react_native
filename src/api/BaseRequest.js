import DeviceStorage from '../utils/DeviceStorage'

const baseUrl = 'http://192.168.154.131:8923/v1'

const BaseRequest = async (url, data, method = 'GET') => {
    const authorization = await DeviceStorage.get('token')
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": authorization
    }
    return fetch(baseUrl + url, {
        method,
        body: JSON.stringify(data),
        headers: headers
    })
        .then(res => (res.json()))
        .catch(err => console.log(err))
}

export default BaseRequest
