import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import {  getFilteredProducts, getProductsDb } from '../actions/products';
import '../App.css';
import { ProductContext } from '../context/productContext';
import { fetchApi } from '../helpers/fetch';


let priceRange = [ '$0 - $5.000', '$5.000 - $50.000', '$50.000 - xxxxxx']

export const Home = () => {

  const { state, dispatch } = useContext(ProductContext)
  const { products, categories } = state;

   

  const [filter, setFilter] = useState({
    searchTerm: '',
    category: 'xx',
    pag: 1,
    rxp: 5,
    price: 'select range price'

  })



  useEffect(() => {

    const applyFilters = async () => {

      console.log('FILTRO=',filter)
      try {
        const resp = await fetchApi(`products/test`, filter, 'POST');
        const data = await resp.json()
        
        if (resp.ok) {
          dispatch(getFilteredProducts(data.products))

        }

      } catch (error) {
        console.log(error)
      }

    }
    applyFilters()

  }, [filter])

  /*** HANDLE FILTER REGISTER ***/
  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })

    //console.log(filter)
  }

  /** DELETE PRODUCTS ***/
  const handleDelete = async (id) => {

    try {
      const resp = await fetchApi(`products/${id}`, {}, 'DELETE');
      const data = await resp.json();

      if (resp.ok) {
        //dispatch(deleteProduct(id))
        dispatch(getProductsDb(data.products))
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      })

    } catch (error) {
      console.log(error)
    }


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
    <>
      <div className="container-fluid">

        <main className='mt-4 d-flex flex-column'>
          <h1 className='text-center'>Welcome to Random Products Company</h1>

          <form className='w-100 d-flex flex-column align-items-center justify-content-center mt-3' onSubmit={clearFilters}>
          <div className='w-100 d-flex justify-content-center my-1'>
            <button 
              className='btn btn-info mx-2'>
                Clear filters
            </button>
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
                {
                  priceRange.map((price) => (
                    <option value={price}>{price}</option>
                  ))
                }
              </select>  
            
            </div>
       
            
          </form>

          {products.length === 0 && <h1 className='text-center mt-4'>No more products to show</h1>}

          <div className='row mt-2 d-flex justify-content-center'>

            {
              products?.map((p) => (
                <div key={p.uid} className='col-10 col-sm-8 col-md-4 col-lg-3 m-3 d-flex flex-column justify-content-around border rounded p-3 shadow'>
                  <div className='product__imageBox'>
                    <img className='product__image rounded' src="https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='product-img'></img>
                  </div>
                  <div>
                    <h3 className='text-capitalize fw-semibold mt-2'>{p.name}</h3>
                    <span className='text-primary display-6 fw-semibold'>${p.price}</span>
                    <p>{p.description}</p>
                    <Link to={`/edit/${p._id}`}>
                      <button className='btn btn-primary me-2'>
                        Edit
                      </button>
                    </Link>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }

          </div>


        </main>
      </div>

    </>
  );

}

