import { useState, useEffect } from "react";
import {closeModal} from '../../redux/actions/actionModal'
import { useDispatch, useSelector } from 'react-redux'
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import BuyNow from "./BuyNow";

export default function Modal() {
    const isModalOpen = useSelector((state) => state.modal.isModalOpen)
    const activeContent = useSelector((state) => state.modal.activeContent)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(isModalOpen);


    const handleCloseModal = () => {
        dispatch(closeModal())
    }

  return (
    <div className={`modal fixed inset-0 z-10 ${isOpen? 'open' : ''}`}>
        <div className="popup-wrap w-full h-full overflow-auto p-3 flex items-center justify-center">
            
            <div className="popup bg-white rounded-2xl p-8  px-6 lg:px-10 w-full max-w-[650px] relative z-[11]">
                <button onClick={handleCloseModal} className="absolute top-0 right-0 p-3">
                    <span className="material-symbols-rounded mr-1">close</span>
                </button>

                {activeContent === 'add new product' && (
                    <AddProduct/>
                )}

                {activeContent === 'add new customer' && (
                   <AddCustomer/>
                )}

                {activeContent === 'delete product' && (
                    <DeleteProduct/>
                )}

                {activeContent === 'delete customer' && (
                    <DeleteCustomer/>
                )}

                {activeContent === 'buy now' && (
                    <BuyNow/>
                )}

            </div>

            <div onClick={handleCloseModal} className="fixed inset-0 z-10 bg-black/70"></div>
        </div>

    </div>
  )
}
