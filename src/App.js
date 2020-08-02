import React from 'react'
import Root from './container/Root'
import { Provider } from 'react-redux'
import store from './store'

const App = () => (
    <Provider store={store}>
        <Root />
    </Provider>
)

export default App
