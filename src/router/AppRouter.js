import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateProduct } from "../pages/CreateProduct";
import { EditProduct } from "../pages/EditProduct";
import { Home } from "../pages/Home";

import { Footer } from '../components/Footer';


const AppRouter = () => {
  return (
      <BrowserRouter>
        
     
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/create' element={<CreateProduct/>}/>
              <Route path='/edit/:id' element={<EditProduct/>}/>
          </Routes>
          <Footer/>
      
      </BrowserRouter>
  )
}

export default AppRouter