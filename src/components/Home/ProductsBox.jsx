
import ProdImg from '../../assets/salsa.svg'
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {openModal, switchModalContent} from '../../redux/actions/actionModal'

export default function ProductsBox() {
  const products = useSelector((state) => state.products.products)
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(openModal())
    dispatch(switchModalContent('add new product'))
  }

  return (
    <div className="bg-white rounded-md p-5 shadow-lg">
        <h2 className="text-xl text-gray-400 mb-4">Most Popular Products</h2>
        {products.length == 0? (
          <div className='border-t border-gray-300 py-4 text-center'>
            <span className="material-symbols-rounded my-4 text-gray-300 !text-[60px]">inventory_2</span>
            <h2 className='text-2xl capitalize mb-5'>You have no Products yet..</h2>
            <button onClick={handleOpenModal} className='bt-primary mx-auto !px-9'>Add New</button>
          </div>
        ) : (
          <>
          <div className='mb-2'>
            {products.slice(0, 3).map(prod => (
                    <Link to={`/products/${prod.id}`} key={prod.id} className='border-t border-gray-300 py-2 flex items-center'>
                      <div className='prod-img w-1/6'><img src={ProdImg} alt={prod.name} /></div>
                      <div className='flex-1 flex justify-between items-center'>
                        <div>
                          <h2 className='text-lg font-bold'>{prod.name}</h2>
                          {prod.quantity == 0? (
                              <div className='tag-outStock mt-1'>Out of Stock</div>  
                          ) : (
                            <p className='text-gray-400'>In Stock: {prod.quantity}</p>
                          )} 
                         
                        </div>
                        <div className='text-2xl'><span className="currency">$</span>{prod.price}</div>  
                      </div>
                    </Link>
                ))}
          </div>
          <Link to="/products" className='bt-primary'>All Products</Link>
          </>
        )}
    </div>
  )
}
