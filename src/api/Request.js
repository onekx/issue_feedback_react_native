const baseUrl = 'http://192.168.154.131:8923'
const Request = (url , data, method='get') => {
    return fetch(baseUrl + url, {
        method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => (res.json()))
    .catch(err => console.log(err))
}

export default Request