import {Link } from 'react-router-dom'
import {openModal, switchModalContent, setModalProp} from '../../redux/actions/actionModal'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import Orders from './Orders';

export default function CustomerItem({customer}) {
    const purchases = useSelector((state) => state.purchases.purchases)
    const products = useSelector((state) => state.products.products)
    const [isExpand, setIsExpand] = useState(false);
    const dispatch = useDispatch()

    const customerProducts = (_id) => {
        return purchases.filter((purchase) => purchase.CustomerID === _id)
    }

    const customerOrders = purchases.filter((purchase) => purchase.CustomerID === customer.id)
    const totalPrices = customerOrders.reduce((total, order) => {
        const product = products.find((product) => product.id === order.ProductID)
        if(product){
            total += +product.price;
        }
        return  total;
    }, 0)

    const openBuyNow = () => {
        dispatch(openModal());
        dispatch(switchModalContent('buy now'));
        dispatch(setModalProp(customer));
    }

  return (
    <div className="product-item bg-white rounded-md p-5 shadow-lg mb-4">
        <div className='flex items-center justify-between'>
            <Link to={`/customers/${customer.id}`} className='w-1/4'>
                <h2 className='text-2xl font-bold'>{customer.firstName} {customer.lastName}</h2>
                <p className='text-gray-600 mt-1 mb-0'>From: {customer.city}</p>
            </Link>
            <div className='w-1/5'>
                <div className='text-sm text-gray-400 mb-1'>Total Purchases</div>
                <div className='font-bold text-xl'>
                   <span className="currency">$</span>{totalPrices.toLocaleString()}
                </div>     
            </div>
            <div className='w-1/5'>
                <button onClick={openBuyNow} className='bt-primary !text-sm !h-auto !py-2'>+ Add Product</button>
            </div>
            <div>
                <Link to={`/customers/${customer.id}`} className="bt-edit mb-6 w-fit">
                    <span className="material-symbols-rounded mr-1">border_color</span>
                    Edit
                </Link>
                
                <button onClick={() => setIsExpand(!isExpand)} className="mr-auto flex items-center text-sm">
                    Show Purchases ({customerProducts(customer.id).length})
                    <span className={`material-symbols-rounded ${isExpand? 'rotate-180' : ''} mr-1 transition-all`}>expand_more</span>
                </button>

            </div>
        </div>
        <div className='expand-open' aria-expanded={isExpand? 'true' : 'false'}>
            <div className='inner-expand overflow-hidden'>
                <Orders customer={customer}/>
            </div>
        </div>
    </div>
  )
}
