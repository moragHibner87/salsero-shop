const initialState = {
    isModalOpen: false,
    activeContent: '',
    modalProp: {},
};

const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case 'OPEN_MODAL':
            return {
              ...state,
              isModalOpen: true,
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                isModalOpen: false,
            };
        case 'SWITCH_MODAL_CONTENT':
            return {
                ...state,
                activeContent: action.payload,
            };
        case 'SET_MODAL_PROP':
            return {
               ...state,
                modalProp: action.payload,
            };
        default:
            return state;
        
    }
}

export default modalReducer;