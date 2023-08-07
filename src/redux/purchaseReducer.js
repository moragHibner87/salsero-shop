const initialState = {
    purchases: []
}

const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_PURCHASES':
            return {
                ...state,
                purchases: action.payload
            }
        default:
            return state;
        }
}

export default purchaseReducer;