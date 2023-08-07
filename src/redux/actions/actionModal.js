const openModal = () => {
    return {
        type: 'OPEN_MODAL',
    }
}

const closeModal = () => {
    return {
      type: 'CLOSE_MODAL',
    };
};

const switchModalContent = (contentType) => {
    return {
      type: 'SWITCH_MODAL_CONTENT',
      payload: contentType,
    };
};

const setModalProp = (_prop) => {
    return {
        type: 'SET_MODAL_PROP',
        payload: _prop
    }
}

export {openModal, closeModal, switchModalContent, setModalProp}