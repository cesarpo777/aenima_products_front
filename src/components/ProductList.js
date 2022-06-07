import React from 'react';
import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchApi } from '../helpers/fetch';
import { getProductsDb } from '../actions/products';

export const ProductList = () => {

 const { state, dispatch } = useContext(ProductContext)

 const { products } = state;

  const handleDelete = async (id) => {

    try {
      const resp = await fetchApi(`products/${id}`, {}, 'DELETE');
      const data = await resp.json();

      if (resp.ok) {
      
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

  return (
    <>
    {products.length === 0 && <h1 className='text-center my-2'>No products to show</h1>}
    <div className='row mt-2 d-flex justify-content-center'>

            {
              products?.map((p) => (
                <div key={p._id} className='col-10 col-sm-8 col-md-4 col-lg-3 m-3 d-flex flex-column justify-content-around border rounded p-3 shadow'>
                  <div className='product__imageBox'>
                    <img className='product__image rounded' src={p.img} alt='product-img'></img>
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
    </>
  )
}
