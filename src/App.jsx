import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements, 
  Route, 
  useLocation 
} from "react-router-dom"
import { useEffect } from 'react';

import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Customers from "./pages/Customers"
import Purchases from './pages/Purchases'
import Product from "./pages/Product"
import Customer from './pages/Customer'
import ErrorPage from "./pages/ErrorPage";


function ScrollToTop({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<ScrollToTop><Layout/></ScrollToTop>}>
    <Route index element={<Home/>} />
    <Route path="/products" element={<Products/>}/>
    <Route path="products/:id" element={<Product/>}/>
    <Route path="/customers" element={<Customers/>} />
    <Route path="/customers/:id" element={<Customer/>} />
    <Route path="/purchases" element={<Purchases/>} />
    <Route path="*" element={<ErrorPage/>} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
   
  )
}

export default App
