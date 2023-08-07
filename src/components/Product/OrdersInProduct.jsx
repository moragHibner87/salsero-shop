import { useSelector } from 'react-redux'
import ProductOrder from './ProductOrder'
import { Link } from 'react-router-dom'

export default function OrdersInProduct({product}) {
  const purchases = useSelector((state) => state.purchases.purchases)
  const customers = useSelector((state) => state.customers.customers)

  const productPurchases = purchases.filter((purchase) => purchase.ProductID === product.id)
  
  return (
    <>
    {productPurchases.length > 0? (
       <>
       <div className='all-orders bg-white/70'>
           {
               productPurchases.map(order => (
                   <ProductOrder key={order.id} order={order} />
               ))
           }
       </div>
       <div className='mt-10 flex flex-row-reverse justify-between items-center'>
           <div className='font-bold text-xl'>Total Orders: {productPurchases.length}</div>
       </div>
       </>
    ) : (
      <div>
          <div className='text-2xl mb-4 mt-5'>No orders yet..</div>
          <Link to="/customers" className='bt-primary !inline-flex !px-8'>Buy Now</Link>
      </div>
    )}
    </>
  )
}
