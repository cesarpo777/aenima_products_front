import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategoriesDb } from '../actions/categories';
import { getFilteredProducts } from '../actions/products';
import { ProductContext } from '../context/productContext';
import { fetchApi } from '../helpers/fetch';
import { Btn } from './Btn';

export const FilterForm = () => {

const { state ,dispatch } = useContext(ProductContext);
const { categories } = state;

const [filter, setFilter] = useState({
    searchTerm: '',
    category: 'xx',
    pag: 1,
    rxp: 5,
    price: 'select range price'

})

let priceRange = [ '$0 - $5.000', '$5.000 - $50.000', '$50.000 - xxxxxx']

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
}, [dispatch])

useEffect(() => {
    const applyFilters = async () => {
    try {
        const resp = await fetchApi(`products/test`, filter, 'POST');
        const data = await resp.json()
        //console.log( data.products)
        if (resp.ok) {
          dispatch(getFilteredProducts(data.products))
        }

    } catch (error) {
        console.log(error)
    }

    }
    applyFilters()

  }, [filter, dispatch])



const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
}

const clearFilters = (e) => {
    e.preventDefault()
    setFilter({
      searchTerm: '',
      category: 'xx',
      pag: 1,
      rxp: 5,
      price: 'select range price'
    })
  }


  return (
    <form className='w-100 d-flex flex-column align-items-center justify-content-center mt-3' onSubmit={clearFilters}>
          <div className='w-100 d-flex justify-content-center my-1'>
            <Btn text="Clear filters"/>
            <input
              type='text'
              className='form-control fw-semibold w-25'
              placeholder='Search your product'
              name='searchTerm'
              value={filter.searchTerm}
              onChange={handleChange}
            />

            <select className='mx-1' name='category' value={filter.category} onChange={handleChange}>
              <option value='xx' className='fw-semibold'>Choose category</option>
              {
                categories?.map((c) => (
                  <option key={c.uid} value={c.uid}>{c.name}</option>
                ))
              }
            </select>

            <Link to='/create'>
              <button
                className='btn btn-success mx-1 fw-semibold'
              >
                + New product
              </button>

            </Link>
            </div>

            <div>
            
            <label className='fw-semibold mx-1'>Page</label>
            <input
              type="number"
              className='fw-semibold'
              name="pag"
              value={filter.pag}
              min="1"
              onChange={handleChange}
            />

            </div>

            
            <div>
              <label className='fw-semibold mx-1'>Price range</label>
              <select className='fw-semibold' name='price' value={filter.price} onChange={ handleChange }>
              <option value='xx' className='fw-semibold'>Select price range</option>
                {
                  priceRange.map((price, i) => (
                    <option key={i} value={price}>{price}</option>
                  ))
                }
              </select>  
            
            </div>
       
            
          </form>
  )
}
