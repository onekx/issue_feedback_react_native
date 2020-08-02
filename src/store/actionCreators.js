import { UPDATE_PRODUCTS } from './actionType'
import { products } from '../api/RequestFactory'

export const mapDispatchToProps = (dispatch) => {
    return {
        async updateProducts() {
            const { result } = await products()
            const action = {
                type: UPDATE_PRODUCTS,
                products: result.products
            }
            dispatch(action)
        }
    }
}

export const mapStateToProps = (state) => {
    return { products: state.products }
}