
import '../App.css';
import { FilterForm } from '../components/FilterForm';
import { ProductList } from '../components/ProductList';



export const Home = () => {

  return (
    <>
      <div className="container-fluid">

        <main className='mt-4 d-flex flex-column'>
          <h1 className='text-center'>Welcome to Random Products Company</h1>
            <FilterForm/>
            <ProductList/>
        </main>
      </div>

    </>
  );

}

