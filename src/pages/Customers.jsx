
import {openModal, switchModalContent} from '../redux/actions/actionModal'
import { useSelector, useDispatch } from "react-redux";
import CustomerItem from '../components/Customer/CustomerItem'

export default function Customers() {
  const customers = useSelector((state) => state.customers.customers)
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(openModal())
    dispatch(switchModalContent('add new customer'))
  }

  return (
    <div>
        <div className="flex items-center justify-between mb-5">
            <h1 className="font-nunito text-3xl md:text-5xl !leading-[1.2] font-semibold">
              Customers <sup className="text-orange-500 text-[.6em]">{customers.length > 0 && customers.length}</sup>
            </h1>
            {customers.length > 0 && (
              <button onClick={handleOpenModal} className="bt-primary">Add New</button>
            )}
        </div>
        {customers.length === 0 ? (
          <div>
            <div className='py-8 text-center'>
              <span className="material-symbols-rounded my-4 text-orange-500 !text-[70px]">person</span>
              <h2 className='text-2xl capitalize mb-5'>You have no Customers yet..</h2>
              <button onClick={handleOpenModal} className='bt-primary mx-auto !px-9'>Add New</button>
            </div>
          </div>
        ) : (
          <div className="all-customers">
            {
                customers.length == 0? (
                    <div>Loading...</div>
                ) : (
                  customers.map(customer => (
                        <CustomerItem key={customer.id} customer={customer}/>
                    ))
                )
              
            }
          </div>
        )}
        

    </div>
  )
}
