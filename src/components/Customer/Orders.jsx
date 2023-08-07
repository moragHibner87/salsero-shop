import {openModal, switchModalContent, setModalProp} from '../../redux/actions/actionModal'
import { useDispatch, useSelector } from 'react-redux'
import CustomerOrder from './CustomerOrder'

export default function Orders({customer}) {
    const purchases = useSelector((state) => state.purchases.purchases)
    const products = useSelector((state) => state.products.products)
    const dispatch = useDispatch()

    const openBuyNow = () => {
        dispatch(openModal());
        dispatch(switchModalContent('buy now'));
        dispatch(setModalProp(customer));
    }

    const customerOrders = purchases.filter((purchase) => purchase.CustomerID === customer.id)
    const totalPrices = customerOrders.reduce((total, order) => {
        const product = products.find((product) => product.id === order.ProductID)
        if(product){
            total += +product.price;
        }
        return  total;
    }, 0)

  return (
    <>
    {
        customerOrders.length > 0 ? (
           <>
           <div className='all-orders bg-white/70'>
               {
                   customerOrders.map(order => (
                       <CustomerOrder key={order.id} order={order}/>
                   ))
               }
           </div>
           <div className='mt-10 flex flex-row-reverse justify-between items-center'>
               <div className='font-bold text-xl'>Total: <span className="currency">$</span>{totalPrices.toLocaleString()}</div>
               <button onClick={openBuyNow} className='bt-primary !px-8'>+ Add More</button>
           </div>
           </>
       ) : (
          
       <div>
            <div className='text-2xl mb-4 mt-5'>No orders yet..</div>
            <button onClick={openBuyNow} className='bt-primary !px-8'>Buy Now</button>
        </div>
       )
   }
   </>

  )
}
