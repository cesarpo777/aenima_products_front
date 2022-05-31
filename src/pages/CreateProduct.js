import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createProducts } from '../actions/products';
import { BtnBack } from '../components/BtnBack';
import { ProductContext } from '../context/productContext';
import { fetchApi } from '../helpers/fetch';
//import { useForm } from '../hooks/useForm';
//import { fetch } from '../helpers/fetch';

export const CreateProduct =() => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(ProductContext)
  const { categories } = state;
  
  
  const [formValues, setFormValues] = useState({
    category: '',
    name: '',
    price: '',
    description: ''
  })

  console.log( formValues )
  const handleInputChange = (e) => {

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })

    
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    
        try {
          const resp = await fetchApi('products', formValues, 'POST');
          const data = await resp.json();
          console.log(data)
    
          if (resp.ok) {
            dispatch(createProducts(formValues))
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: data.msg,
              showConfirmButton: false,
              timer: 1500
            })
            navigate('/')
          }else{


            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.errors
            })
          }
    
    
        } catch (error) {
          console.log(error)
        }
    
      
      
    
    }



  return (
    <div className='container mt-4'>
      <BtnBack />
      <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
        <h3 className='fw-semibold'>Upload your product</h3>

        <select className='mx-1' name='category' value={formValues.category} onChange={handleInputChange} required>
          <option value='xx' className='fw-semibold'>Choose category</option>
          {
            categories?.map((c) => (
              <option key={c.uid} value={c.uid}>{c.name}</option>
            ))
          }
        </select>
        { formValues.categoryError.length > 0 && <span className='text-danger'>{formValues.categoryError} </span>}
        <input
          type='text'
          className='form-control w-50 my-2 fw-semibold'
          placeholder='Name'
          name='name'
          value={formValues.name}
          onChange={handleInputChange}
          
        />
         { formValues.nameError.length > 0 && <span className='text-danger'>{formValues.nameError} </span>} 
        <input
          type='text'
          className='form-control w-50 text-center my-2 fw-semibold'
          placeholder='$0.00'
          name='price'
          value={formValues.price}
          onChange={handleInputChange}
          
        />

        <textarea
          className='form-control w-50 my-2 fw-semibold'
          rows='4'
          placeholder='Description goes here..'
          name='description'
          value={formValues.description}
          onChange={handleInputChange}
          
        >
        </textarea>

        <input
          type="file"
          className='form-control w-50 my-2 fw-semibold'
        />

        <button type='submit' className='btn btn-success fw-semibold w-50 text-uppercase'>
          upload
        </button>

      </form>

    </div>
  )
}

