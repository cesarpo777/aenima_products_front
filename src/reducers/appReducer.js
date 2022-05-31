
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

        case 'ADD_PRODUCT':
            return {
                ...state,
                products:[...state.products, action.payload ]
            }
        
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter( p => p.id !== action.payload.id )
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