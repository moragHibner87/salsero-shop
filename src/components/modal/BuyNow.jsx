
import { useSelector, useDispatch } from "react-redux";
import {closeModal} from '../../redux/actions/actionModal'
import {addItem, resetState, updateItem} from '../../firebase'
import { doInitCustomers } from '../../redux/actions/actionCustomers'
import { doInitProducts } from '../../redux/actions/actionProduct'
import { doInitPurchases } from '../../redux/actions/actionPurchase'

// handle Date Format
const dateFormat = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function BuyNow() {
    const products = useSelector((state) => state.products.products)
    const customer = useSelector((state) => state.modal.modalProp)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const productId = e.target.product.value;
        const selectedProduct = products.find((product) => product.id === productId)

        const currentDate = new Date();
        const newPurchase = {
            CustomerID: customer.id,
            ProductID: productId,
            Date: dateFormat(currentDate)
        }

        const newQuantity = selectedProduct.quantity - 1;
        try{
            // create a new purchase
            await Promise.all([
                addItem('purchases', newPurchase),
                updateItem('products', productId, { quantity: newQuantity })
            ])

            // reset the states
            await Promise.all([
                resetState(dispatch,doInitProducts, 'products'),
                resetState(dispatch,doInitCustomers, 'customers'),
                resetState(dispatch,doInitPurchases, 'purchases')
            ])

            dispatch(closeModal())

        }catch(error){
            console.error(error)
        }

       
    }

    const availableProducts = products.filter((product) => product.quantity > 0);

  return (
    <div>
        <h2 className="text-2xl lg:text-3xl !leading-[1.2] font-semibold mb-5">Make a New Order for {customer.firstName}</h2>
        <p>Choose Product:</p>
        <form onSubmit={handleSubmit}>
            <select name="product" className="input rounded border border-gray-300 px-4">
                <option value="" hidden>Choose Product</option>
                {availableProducts.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                ))}
            </select>
            <button type="submit" className="bt-primary !px-8 mt-8">Buy Now</button>
        </form>
    </div>
  )
}
