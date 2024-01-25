import {Link } from 'react-router-dom'
import ProdImg from '../../assets/salsa.svg'
import { useSelector } from 'react-redux'

export default function ResultRow({purchase}) {
    const products = useSelector(state => state.products.products)
    const customers = useSelector(state => state.customers.customers)

    const product = products.find(product => product.id === purchase.ProductID)
    const customer = customers.find(customer => customer.id === purchase.CustomerID)

  return (
    <div className='bg-white rounded-md p-5 py-3 shadow-lg mb-4 flex justify-between items-center'>
      <Link to={`/customers/${customer.id}`} className='w-full sm:w-1/2 lg:w-1/5'>
        <div className='text-lg lg:text-xl font-bold'>{purchase.Date}</div>
        <h2 className='text-xl font-bold lg:hidden flex items-center'>{customer.firstName} {customer.lastName}</h2>
      </Link>
      <Link to={`/customers/${customer.id}`} className='hidden lg:flex items-center w-1/4'> 
          <h2 className='text-xl font-bold flex-1'>{customer.firstName} {customer.lastName}</h2>      
      </Link>
      <Link to={`/products/${product.id}`} className='flex items-center w-full sm:w-1/2 lg:w-1/4 mt-3 sm:mt-0'>
          <div className='prod-img w-[60px]'><img src={ProdImg} alt={product.name}/></div> 
          <div className='flex-1'>
            <h2 className='text-lg lg:text-xl font-bold !leading-[1.1]'>{product.name}</h2>
            <div className='lg:hidden text-xl mt-2'><span className="currency">$</span>{parseInt(product.price).toLocaleString()}</div>  
          </div>
      </Link>
      <div className='hidden lg:block text-2xl w-1/5 text-right mr-4'><span className="currency">$</span>{parseInt(product.price).toLocaleString()}</div>
    </div>
  )
}
