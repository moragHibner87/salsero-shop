const initialState = {
    products: [],
    totalPurchased: 0
}

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case 'INIT_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.id ? { ...product, ...action.payload.updatedProduct } : product
                ),
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((product) => product.id!== action.payload)
            }
        default:
            return state
    }

}

export default productReducer;