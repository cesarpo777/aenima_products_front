import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BtnBack } from '../components/BtnBack';
import { ProductContext } from '../context/productContext';
import { fetchApi } from '../helpers/fetch';


export const EditProduct = () => {


  const { state } = useContext(ProductContext);
  const { categories } = state;

  const navigate = useNavigate();
  const params = useParams();

  

  useEffect(() =>{

    const existProduct = state.products.find(p => p._id === params.id)
    console.log( params.id )
    if(existProduct){
      setFormValues(existProduct)
    }else{
      navigate('/')
    }

  },[params.id])

  const [ formValues, setFormValues ] = useState({
    category:'',
    name:'',
    price: '',
    description:''
  })


  const handleInputChange = (e) =>{

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    try {
      const resp = await fetchApi(`products/${params.id}`, formValues, 'PUT');
      const data = await resp.json();
      console.log( data )

      //dispatch(getProductsDb(data.products))
    
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      })
      
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className='container mt-4'>
      <BtnBack/>
      <form onSubmit={ handleSubmit } className='d-flex flex-column align-items-center'>
        <h3 className='fw-semibold'>Update your product</h3>

     { categories.length === 0 && <span>Loading categories..</span>}
      <select value={formValues.category} name="category" onChange={ handleInputChange }>
        <option>CHOOSE CATEGORY</option>
        {
          categories?.map((c)=> (
            <option 
              key={c.uid} 
              value={c.uid}
              > 
                {c.name}
            </option>
          ))
        }
      </select>

        <input
          type='text'
          className='form-control w-50 my-2 fw-semibold'
          placeholder='Name'
          name='name'
          value={ formValues.name }
          onChange= {handleInputChange}
          required
        />

        <input
          type='text'
          className='form-control w-50 text-center my-2 fw-semibold'
          placeholder='$0.00'
          name='price'
          value={ formValues.price }
          onChange= { handleInputChange }
          required
        />

        <textarea
          className='form-control w-50 my-2 fw-semibold'
          rows='4'
          placeholder='Description goes here..'
          name='description'
          value={ formValues.description }
          onChange= { handleInputChange }
          required
        >
        </textarea>

      <input
        type="file"
        className='form-control w-50 my-2 fw-semibold'
      />

      <button type='submit' className='btn btn-success fw-semibold w-50 text-uppercase'>
        Edit product
      </button>

      </form>

    </div>
  )
}