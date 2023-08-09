import { useState } from "react";
import { addItem, resetState } from "../../firebase";
import { useDispatch } from 'react-redux'
import {closeModal} from '../../redux/actions/actionModal'
import { doInitCustomers } from '../../redux/actions/actionCustomers'

export default function AddCustomer() {
    const dispatch = useDispatch()
    const [data, setData] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addItem('customers', data);
            await resetState(dispatch, doInitCustomers, 'customers')

        } catch (error) {
            console.error('Error adding item to Firebase:', error);
        }

        dispatch(closeModal())
    }

  return (
    <div>
        <h2 className="text-2xl lg:text-3xl !leading-[1.2] font-semibold mb-5">Add New Customer</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="label !text-sm mb-1">First Name</label>
                <input required type="text" name="firstName" value={data.firstName || ''} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
            </div>
            <div className="mb-4">
                <label className="label !text-sm mb-1">Last Name</label>
                <input required type="text" name="lastName" value={data.lastName || ''} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
            </div>
            <div className="mb-4">
                <label className="label !text-sm mb-1">City</label>
                <select name="city" value={data.city || ''} onChange={handleChange} className="input rounded border border-gray-300 px-4">
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
            <button type="submit" className="bt-primary">
                Add Customer
            </button>
        </form>
    </div>
  )
}
