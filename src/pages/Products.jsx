import ProductItem from "../components/Product/ProductItem";
import {openModal, switchModalContent} from '../redux/actions/actionModal'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Products() {
    const products = useSelector((state) => state.products.products)
    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(openModal())
        dispatch(switchModalContent('add new product'))
    }

  return (
    <div>
        <div className="flex items-center justify-between mb-5">
            <h1 className="font-nunito text-3xl md:text-5xl !leading-[1.2] font-semibold">
                Products <sup className="text-orange-500 text-[.6em]">{products.length > 0 && products.length}</sup>
            </h1>
            {products.length > 0 && (
                <button onClick={handleOpenModal} className="bt-primary">Add New</button>
            )}
        </div>
        {products.length === 0 ? (
          <div>
            <div className='py-8 text-center'>
              <span className="material-symbols-rounded my-4 text-orange-500 !text-[70px]">inventory_2</span>
              <h2 className='text-2xl capitalize mb-5'>You have no Products yet..</h2>
              <button onClick={handleOpenModal} className='bt-primary mx-auto !px-9'>Add New</button>
            </div>
          </div>
        ) : (
            <div className="all-products">
                {
                    products.length == 0? (
                        <div>Loading...</div>
                    ) : (
                        products.map(prod => (
                            <ProductItem key={prod.id} prod={prod}/>
                        ))
                    )
                
                }
            
            </div>
        )}

    </div>
  )
}
