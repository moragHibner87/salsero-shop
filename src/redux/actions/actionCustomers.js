const doInitCustomers = (_customers) => {
    return {
        type: 'INIT_CUSTOMERS',
        payload: _customers,
    }
}


export {doInitCustomers}