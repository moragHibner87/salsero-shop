
import { useState, useEffect } from 'react'
import {resetState, updateItem} from '../../firebase'
import { doInitCustomers } from '../../redux/actions/actionCustomers'
import {openModal, switchModalContent, setModalProp} from '../../redux/actions/actionModal'
import { useDispatch } from 'react-redux'

export default function EditCustomer({ customer}) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        if (customer) {
            setFirstName(customer.firstName || '');
            setLastName(customer.lastName || '');
            setCity(customer.city || '');
            setFullName(`${customer.firstName} ${customer.lastName}`)
        }
      }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case 'firstName':
            setFirstName(value);
            break;
          case 'lastName':
            setLastName(value);
            break;
          case 'city':
            setCity(value);
            break;
          default:
            break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCustomer = {
            firstName,
            lastName,
            city
        }
        try {

            await updateItem('customers', customer.id, newCustomer);
            await resetState(dispatch, doInitCustomers, 'customers');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
        catch (error) {
            console.log(error);
        }
        
    };

    const handleDelete = () => {
        dispatch(openModal());
        dispatch(switchModalContent('delete customer'));
        dispatch(setModalProp(customer));
    }


  return (
    <div className='flex bg-white rounded-md p-5 shadow-lg'>
        <div className='flex-1'>
            <h1 className="font-nunito text-3xl md:text-5xl !leading-[1.2] font-semibold mb-3">{customer.firstName} {customer.lastName}</h1>

            <h2 className='font-bold mb-2'>Edit Customer:</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="label !text-sm mb-1">First Name</label>
                    <input required type="text" name="firstName" value={firstName} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
                </div>
                <div className="mb-4">
                    <label className="label !text-sm mb-1">Last Name</label>
                    <input required type="text" name="lastName" value={lastName} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
                </div>
                <div className="mb-4">
                    <label className="label !text-sm mb-1">City</label>
                    <select name="city" value={city} onChange={handleChange} className="input rounded border border-gray-300 px-4">
                        <option value="" hidden>Select City</option>
                        <option value="Tel Aviv">Tel Aviv</option>
                        <option value="Medellín">Medellín</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Houston">Houston</option>
                        <option value="Philadelphia">Philadelphia</option>
                        <option value="Phoenix">Phoenix</option>
                        <option value="San Antonio">San Antonio</option>
                        <option value="San Diego">San Diego</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="San Jose">San Jose</option>
                        <option value="Sao Paulo">Sao Paulo</option>
                        <option value="Seattle">Seattle</option>
                    </select>
                </div>
                <div className='flex justify-between'>
                    <button type="submit" className="bt-primary">
                        Update Customer
                    </button>
                    <button type='button' onClick={handleDelete} className="flex items-center text-base text-red-500">
                        <span className="material-symbols-rounded mb-1">delete</span>
                        Delete Customer
                    </button>
                </div>
               
                {showMessage && (
                    <div className="text-green-500 font-semibold mt-2">
                        Customer Successfully Updated!
                    </div>
                )

                }
            </form>
        </div>
    </div>
  )
}
