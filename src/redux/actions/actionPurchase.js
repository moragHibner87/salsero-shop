const doInitPurchases = (_purchases) => {
    return {
        type: 'INIT_PURCHASES',
        payload: _purchases,
    }
}


export {doInitPurchases}