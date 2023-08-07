
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {openModal, switchModalContent} from '../../redux/actions/actionModal'

export default function CustomersBox() {
  const customers = useSelector((state) => state.customers.customers)
  const purchases = useSelector((state) => state.purchases.purchases)
  const dispatch = useDispatch()

  const customerProducts = (_id) => {
    return purchases.filter((purchase) => purchase.CustomerID === _id)
  }

  const handleOpenModal = () => {
    dispatch(openModal())
    dispatch(switchModalContent('add new customer'))
  }

  return (
    <div className="bg-white rounded-md p-5 shadow-lg">
      <h2 className="text-xl text-gray-400 mb-4">Latest Customers</h2>
      {customers.length == 0 ? (
          <div className='border-t border-gray-300 py-4 text-center'>
            <span className="material-symbols-rounded my-4 text-gray-300 !text-[60px]">person</span>
            <h2 className='text-2xl capitalize mb-5'>You have no Customers yet..</h2>
            <button onClick={handleOpenModal} className='bt-primary mx-auto !px-9'>Add New</button>
          </div>
      ) : (
        <>
         <div className='mb-2'>
        {
          customers.slice(0,3).map(customer => (
            <Link to={`/customers/${customer.id}`} key={customer.id} className='border-t border-gray-300 py-4 flex justify-between items-center'>
              <h2 className='text-lg font-bold'>{customer.firstName} {customer.lastName}</h2>
              <div className='text-gray-400'>
                {customerProducts(customer.id).length > 0 ? customerProducts(customer.id).length : 'No'} Orders
              </div>
            </Link>
          ))
        }
      </div>
      <Link to="/customers" className='bt-primary'>All Customers</Link>
        </>
      )}
     
  </div>
  )
}
