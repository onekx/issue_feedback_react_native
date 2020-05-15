const Request = (url, data, method='get') => {
    return fetch(url, {
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