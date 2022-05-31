import React, { createContext, useEffect, useReducer} from 'react';
import { appReducer } from '../reducers/appReducer';
import { fetchApi } from '../helpers/fetch';
import { getCategoriesDb } from '../actions/categories';


export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {

    const initialState = {
        products: [],
        categories: []
    }
    const [state, dispatch] = useReducer(appReducer, initialState)

    useEffect(() => {

        const getCategories = async () => {
    
          try {
    
            const resp = await fetchApi('categories');
            const data = await resp.json()
    
            if (resp.ok) {
              dispatch(getCategoriesDb(data.categories))
            }
    
          } catch (error) {
            console.log(error)
          }
    
    
        }
    
        getCategories()
      }, [])


    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
