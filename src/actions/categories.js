

export const getCategoriesDb = ( categories ) =>{
    return{
        type: 'GET_CATEGORIES',
        payload: categories 
    }
}