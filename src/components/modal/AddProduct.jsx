
import { useState } from "react";
import { addItem, resetState } from "../../firebase";
import { useDispatch } from 'react-redux'
import {closeModal} from '../../redux/actions/actionModal'
import {doInitProducts, addProduct} from '../../redux/actions/actionProduct'

export default function AddProduct() {
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
        console.log(data)
        try {
            await addItem('products', data);
            await resetState(dispatch, doInitProducts, 'products')

        } catch (error) {
            console.error('Error adding item to Firebase:', error);
        }

        dispatch(closeModal())
    }



  return (
    <div>
        <h2 className="text-2xl lg:text-3xl !leading-[1.2] font-semibold mb-5">Add New Product</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="label !text-sm mb-1">Product Name</label>
                <input required type="text" name="name" value={data.name || ''} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
            </div>
            <div className="mb-4">
                <label className="label !text-sm mb-1">Price</label>
                <input type="number" name="price" value={data.price || ''} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
            </div>
            <div className="mb-4">
                <label className="label !text-sm mb-1">Quantity</label>
                <input type="number" name="quantity" value={data.quantity || ''} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
            </div>
            <button type="submit" className="bt-primary">
                Add Product
            </button>
        </form>
    </div>
  )
}
