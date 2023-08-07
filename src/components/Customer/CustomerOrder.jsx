import { useDispatch, useSelector } from 'react-redux'
import {deleteItem, updateItem, resetState} from '../../firebase'
import {doInitPurchases} from '../../redux/actions/actionPurchase'
import { doInitCustomers } from '../../redux/actions/actionCustomers'
import { doInitProducts } from '../../redux/actions/actionProduct'
import {Link } from 'react-router-dom'
import ProdImg from '../../assets/salsa.svg'

export default function CustomerOrder({order}) {
    const products = useSelector((state) => state.products.products)
    const productOrder = products.find((product) => product.id === order.ProductID)

    const dispatch = useDispatch()
    
    const removePurchase = async () => {
        try{
            await deleteItem('purchases',order.id)
            // update the product's quantity
            const newQuantity = productOrder.quantity + 1;
            await updateItem('products', productOrder.id, { quantity: newQuantity });

            await resetState(dispatch,doInitProducts, 'products');
            await resetState(dispatch,doInitCustomers, 'customers');
            await resetState(dispatch,doInitPurchases, 'purchases');        

        }catch(error){
            confirm(error)
        }
    }
  return (
    <div className="border-t border-gray-300 px-4 py-3 flex justify-between items-center last:border-b">
        <Link to={`/products/${productOrder.id}`} className='flex items-center w-1/3'>
            <div className='prod-img w-[60px]'><img src={ProdImg} alt={productOrder.name}/></div> 
            <h2 className='text-xl font-bold flex-1'>{productOrder.name}</h2>      
        </Link>
        <div className='w-1/4'> {order.Date}</div>
        <div className='text-2xl w-1/5 text-right ml-auto mr-4'><span className="currency">$</span>{productOrder.price}</div>
        <div>
            <button onClick={removePurchase} className='flex items-center text-base text-red-500'>Remove</button>
        </div>
    </div>
  )
}
