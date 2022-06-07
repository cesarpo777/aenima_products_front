


export const getProductsDb = (products) =>{
    return{
        type: 'GET_PRODUCTS_DB',
        payload: products
    }
}



export const getFilteredProducts = (filteredProducts) => {
    return{
        type: 'GET_FILTERED_PRODUCTS',
        payload: filteredProducts
    }
}

