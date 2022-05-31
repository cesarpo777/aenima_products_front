


export const getProductsDb = (products) =>{
    return{
        type: 'GET_PRODUCTS_DB',
        payload: products
    }
}

export const getProducts = () => {
    return{
        type: 'GET_PRODUCTS'
    }

}


export const createProducts = (newProduct) => {
    return{
        type: 'ADD_PRODUCT',
        payload: newProduct
    }
}

export const deleteProduct = (id) => {
    return{
        type: 'DELETE_PRODUCT',
        payload: id
    }
}



export const getFilteredProducts = (filteredProducts) => {
    return{
        type: 'GET_FILTERED_PRODUCTS',
        payload: filteredProducts
    }
}

