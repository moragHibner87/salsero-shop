
import {Link, useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getById} from '../firebase'
import EditProduct from '../components/Product/EditProduct'
import OrdersInProduct from '../components/Product/OrdersInProduct'

export default function Product() {
    const {id} = useParams()
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch Product
        const fetchProduct = async () => {
            try {
                const productData = await getById('products', id);
                //console.log(productData);
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally{
                setIsLoading(false)
            }
        };
        fetchProduct();
    }, [id]);
    
    if(isLoading){
        return <div><h2>Loading...</h2></div>
    }

  return (
    <div className="product-page">
        <Link to="/products" className='flex items-center py-4 mb-4'>
            <span className="material-symbols-rounded mr-1">arrow_left_alt</span>
            Back to Products
        </Link>

        <EditProduct product={product} /> 
        
        <div className='mt-6'>
            <h2 className='text-xl font-bold mb-2'>Product Purchases</h2>
           <OrdersInProduct product={product}/> 
        </div>
    </div>
  )
}
