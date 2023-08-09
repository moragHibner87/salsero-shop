import { useDispatch, useSelector } from 'react-redux'
import {deleteItem, resetState} from '../../firebase'
import {doInitPurchases} from '../../redux/actions/actionPurchase'
import { useEffect, useState } from 'react'
import {Link } from 'react-router-dom'

export default function ProductOrder({order}) {
    const customers = useSelector((state) => state.customers.customers)
    const [customer, setCustomer] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCustomer = () => {
            const customerOrder = customers.find((customer) => customer.id === order.CustomerID)
            const customerObj = {
                ...customerOrder,
                purchaseDate: order.Date
            }
            setCustomer(customerObj)
        }
        fetchCustomer()
        
    }, [order, customers])

    const removePurchase = async () => {
        try{
            await deleteItem('purchases',order.id)
            await resetState(dispatch, doInitPurchases, 'purchases')        

        }catch(error){
            console.error(error)
        }
    }


  return (
    <>
    {customer && (
    <Link to={`/customers/${customer.id}`} className="border-t border-gray-300 px-4 py-5 flex justify-between items-center last:border-b">
        <div className='text-xl font-bold w-1/3'> {order.Date}</div>
        <div  className='flex items-center flex-1'> 
            <h2 className='text-xl flex-1'>{customer.firstName} {customer.lastName}</h2>      
        </div>
        <div className="bt-edit w-fit">
            <span className="material-symbols-rounded">border_color</span>
            Edit
        </div>
    </Link>
    )} 
    </>
  )
}
