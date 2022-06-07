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

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}
