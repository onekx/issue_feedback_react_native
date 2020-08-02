import { UPDATE_PRODUCTS } from './actionType'

const defaultState = { products: [] }

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            let newState = JSON.parse(JSON.stringify(state))
            newState.products = action.products
            return newState
        default:
            return state
    }
}