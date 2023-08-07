
import { useSelector, useDispatch } from "react-redux";
import {closeModal} from '../../redux/actions/actionModal'
import {doInitCustomers} from '../../redux/actions/actionCustomers'
import {deleteItem, resetState} from '../../firebase'
import { useNavigate } from 'react-router-dom';

export default function DeleteCustomer() {
    const modalProp = useSelector((state) => state.modal.modalProp)
    const fullName = `${modalProp.firstName} ${modalProp.lastName}`;
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleCloseModal = () => {
        dispatch(closeModal())
    }

    const handleDeleteCustomer = async () => {
        try {
            await deleteItem('customers', modalProp.id)
            await resetState(dispatch, doInitCustomers, 'customers')
            handleCloseModal()
            navigate('/customers')
        }
        catch (error) {
            console.error('Error adding item to Firebase:', error);
        }
 
    }

  return (
    <div className="text-center">
        <h2 className="text-xl lg:text-2xl !leading-[1.2] font-semibold mb-5">Are you sure you want to delete<br/> {fullName}?</h2>
        <div className="flex justify-center gap-3">
            <button className="bt-border" onClick={handleCloseModal}>Oops, no</button>
            <button className="bt-primary" onClick={handleDeleteCustomer}>Yes, im sure!</button>
        </div>
    </div>
  )
}
