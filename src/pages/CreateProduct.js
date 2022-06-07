import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BtnBack } from '../components/BtnBack';
import { ProductContext } from '../context/productContext';
import { fetchFormData } from '../helpers/fetch';
//import { useForm } from '../hooks/useForm';
//import { fetch } from '../helpers/fetch';

export const CreateProduct =() => {


  const navigate = useNavigate();
  const { state } = useContext(ProductContext)
  const { categories } = state;
  
  const formData = new FormData();
  
  const [formValues, setFormValues] = useState({
    category: '',
    name: '',
    price: '',
    description: ''
  });


  const [ file, setFile ] = useState();


  const handleInputChange = (e) => {

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })  
  }

  const handleFile = (e) => {

    setFile(e.target.files[0])
  
  
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    formData.append('category', formValues.category);
    formData.append('name', formValues.name)
    formData.append('price', formValues.price)
    formData.append('description', formValues.description)
    formData.append('image', file)
    
        try {
          const resp = await fetchFormData('products', formData, 'POST');
          const data = await resp.json();
          console.log(data)
    
          if (resp.ok) {
            
            /* Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: data.msg,
              showConfirmButton: false,
              timer: 1500
            }) */
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
      <form 
        onSubmit={handleSubmit} 
        className='d-flex flex-column align-items-center'
      >
        <h3 className='fw-semibold'>Upload your product</h3>

        <select className='mx-1' name='category' value={formValues.category} onChange={handleInputChange} required>
          <option value='xx' className='fw-semibold'>Choose category</option>
          {
            categories?.map((c) => (
              <option key={c.uid} value={c.uid}>{c.name}</option>
            ))
          }
        </select>
        
        <input
          type='text'
          className='form-control w-50 my-2 fw-semibold'
          placeholder='Name'
          name='name'
          value={formValues.name}
          onChange={handleInputChange}
          
        />
         
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
          name="image"
          onChange={ handleFile }
          className='form-control w-50 my-2 fw-semibold'
        />

        <button type='submit' className='btn btn-success fw-semibold w-50 text-uppercase'>
          upload
        </button>

      </form>

    </div>
  )
}

