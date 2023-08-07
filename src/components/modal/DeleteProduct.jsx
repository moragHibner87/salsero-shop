
import { useSelector, useDispatch } from "react-redux";
import {closeModal} from '../../redux/actions/actionModal'
import {doInitProducts, deleteProduct} from '../../redux/actions/actionProduct'
import {deleteItem, resetState} from '../../firebase'
import { useNavigate } from 'react-router-dom';

export default function DeleteProduct() {
    const modalProp = useSelector((state) => state.modal.modalProp)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleCloseModal = () => {
        dispatch(closeModal())
    }

    const handleDeleteProduct = async () => {
        try {
            await deleteItem('products', modalProp.id)
            await resetState(dispatch, doInitProducts, 'products')
            handleCloseModal()
            navigate('/products')
        }
        catch (error) {
            console.error('Error adding item to Firebase:', error);
        }
 
    }

  return (
    <div className="text-center">
        <h2 className="text-xl lg:text-2xl !leading-[1.2] font-semibold mb-5">Are you sure you want to delete<br/> {modalProp.name}?</h2>
        <div className="flex justify-center gap-3">
            <button className="bt-border" onClick={handleCloseModal}>Oops, no</button>
            <button className="bt-primary" onClick={handleDeleteProduct}>Yes, im sure!</button>
        </div>
    </div>
  )
}
