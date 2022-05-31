import { useNavigate } from "react-router-dom"



export const BtnBack = () => {

  const navigate = useNavigate();

  const goBack = () => {
      navigate('/')
  }

  return (
    <button className='btn btn-info text-white fw-semibold' onClick={ goBack }>
        Take me back
    </button>
  )
}
