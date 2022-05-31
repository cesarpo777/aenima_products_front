import React from 'react';
import { useContext } from 'react';
import { ProductContext } from '../context/productContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchApi } from '../helpers/fetch';

export const ProductList = () => {

 const { state, setState } = useContext(ProductContext)

 const { products } = state;

 const handleDelete = async (id) => {

    try {
      const resp = await fetchApi(`products/${id}`, {}, 'DELETE');
      const data = await resp.json();

      console.log(data)
      const { products } = data;

      setState({
        ...state,
        products: products
      })

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
    {products.length === 0 && <h1 className='text-center my-2'>Uploading products...</h1>}
    <div className='row mt-2 d-flex justify-content-center'>

            {
              products?.map((p) => (
                <div key={p._id} className='col-10 col-sm-8 col-md-4 col-lg-3 m-3 d-flex flex-column justify-content-around border rounded p-3 shadow'>
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
                      onClick={() => handleDelete(p.uid)}
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
