

import ProdImg from '../../assets/salsa.svg'
import {Link } from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import OrdersInProduct from './OrdersInProduct';

export default function ProductItem({prod}) {
    const purchases = useSelector((state) => state.purchases.purchases)
    const [isExpand, setIsExpand] = useState(false);

    const productPurchases = (_id) => {
        return purchases.filter((purchase) => purchase.ProductID === _id)
    }

  return (
    <div className={`product-item bg-white rounded-md p-5 shadow-lg mb-4 relative`}>
        <div className='flex items-start lg:items-center'>
            <Link to={`/products/${prod.id}`} className={`${prod.quantity == 0? 'opacity-30' : ''} prod-img`}>
                <img src={ProdImg} alt={prod.name}/>
            </Link>
            <div className="flex-1 flex items-center justify-between">
                <Link to={`/products/${prod.id}`} className='w-full lg:w-1/4 block mb-2 lg:mb-0'>
                    <h2 className='text-lg sm:text-2xl font-bold !leading-[1.1] pr-16 lg:pr-0'>{prod.name}</h2>
                </Link>
                <div className='w-auto lg:w-1/5'>
                    <div className='text-sm text-gray-400 mb-1'>Price</div>
                    <div className='text-xl lg:text-3xl'><span className="currency">$</span>{parseInt(prod.price).toLocaleString()}</div>   
                </div>
                <div className='flex-1 pl-8 lg:pl-1 lg:w-1/5'>
                    <div className='text-sm text-gray-400 mb-1'>In Stock</div>
                    {prod.quantity == 0? (
                        <div className='tag-outStock mt-3'>Out of Stock</div>  
                    ) : (
                        <div className='text-xl lg:text-3xl'>{prod.quantity}</div>  
                    )}  
                </div>
                <div className='w-full lg:w-auto flex lg:block justify-end'>
                    <Link to={`/products/${prod.id}`} className="bt-edit mb-6 w-fit absolute lg:static top-4 right-4">
                        <span className="material-symbols-rounded mr-1">border_color</span>
                        Edit
                    </Link>
                    
                    <button onClick={() => setIsExpand(!isExpand)} className="flex items-center text-sm">
                        show purchases ({productPurchases(prod.id).length})
                        <span className={`material-symbols-rounded ${isExpand? 'rotate-180' : ''} transition-all`}>expand_more</span>
                    </button>

                </div>
            </div>
        </div>
        <div className='expand-open' aria-expanded={isExpand? 'true' : 'false'}>
            <div className='inner-expand overflow-hidden'>
                <OrdersInProduct product={prod}/>
            </div>
        </div>
    </div>
  )
}
