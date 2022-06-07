
const initialState = {
    products: [],
    categories: []
}


export const appReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case'GET_PRODUCTS_DB':
            return {
                ...state,
                products: action.payload
            }
        
        
        case 'GET_FILTERED_PRODUCTS':
            return{
                ...state,
                products: action.payload 
            }

        case 'GET_CATEGORIES':
            return{
                ...state,
                categories: action.payload
            }

        default:
            return state
    }


}