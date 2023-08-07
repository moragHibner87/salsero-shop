const doInitProducts = (_products) => {
    return {
        type: 'INIT_PRODUCTS',
        payload: _products,
    }
}

const addProduct = (_product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: _product
    }
}

const updateProduct = (productId, updatedProduct) => {
    //console.log(productId, updatedProduct)
    return {
      type: 'UPDATE_PRODUCT',
      payload: {
        id: productId,
        updatedProduct,
      },
    };
  };

const deleteProduct = (productId) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: productId
    }
}

export {doInitProducts, addProduct, updateProduct, deleteProduct}