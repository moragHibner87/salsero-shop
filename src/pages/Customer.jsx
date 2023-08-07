import {Link, useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getById} from '../firebase'
import { useDispatch } from 'react-redux'
import EditCustomer from '../components/Customer/EditCustomer';
import Orders from '../components/Customer/Orders'

export default function Customer() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [customer, setCustomer] = useState({});
    

    useEffect(() => {
        // Fetch Customer
        const fetchCustomer = async () => {
            try {
            const customerData = await getById('customers', id);
            setCustomer(customerData);
            } catch (error) {
            console.error('Error fetching customer:', error);
            }
        };
        fetchCustomer();
    }, [id]);
   

  return (
    <div className="customer-page">
        <Link to="/customers" className='flex items-center py-4 mb-4'>
            <span className="material-symbols-rounded mr-1">arrow_left_alt</span>
            Back to Customers
        </Link>
        <EditCustomer customer={customer} />

        <div className='mt-6'>
            <h2 className='text-xl font-bold mb-2'>Customer Orders</h2>
            <Orders customer={customer}/> 
        </div>
        
    </div>

  )
}