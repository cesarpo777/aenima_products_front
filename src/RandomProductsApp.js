import AppRouter from "./router/AppRouter";
import { ProductProvider } from "./context/productContext";


function RandomProductsApp() {

  // acá iria el reducer

  return (
    <ProductProvider>

      <AppRouter/>
    
    </ProductProvider>
    
    
    
  );
}

export default RandomProductsApp;
