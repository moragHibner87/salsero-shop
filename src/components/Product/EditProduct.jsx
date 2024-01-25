
import { useState, useEffect } from 'react'
import ProdImg from '../../assets/salsa.svg'
import {updateItem, resetState} from '../../firebase'
import { doInitProducts, updateProduct } from '../../redux/actions/actionProduct'
import {openModal, switchModalContent, setModalProp} from '../../redux/actions/actionModal'
import { useDispatch } from 'react-redux'

export default function EditProduct({product}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [outStock, setOutStock] = useState(false);

    useEffect(() => {
        if (product) {
          setName(product.name || '');
          setPrice(product.price || '');
          setQuantity(product.quantity || '0');
          setOutStock(parseInt(product.quantity) === 0);
        }
      }, [product]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'price':
          setPrice(value);
          break;
        case 'quantity':
          setQuantity(value);
          break;
        default:
          break;
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            price,
            quantity
        }
        try{
            await updateItem('products', product.id, newProduct);
            await resetState(dispatch,doInitProducts, 'products');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            setOutStock(false)
        }
        catch(err){
            console.error('Error adding item to Firebase:', error);
        }

    };

    const handleDelete = () => {
        dispatch(openModal());
        dispatch(switchModalContent('delete product'));
        dispatch(setModalProp(product));
    }

  return (
    <div className='lg:flex bg-white rounded-md p-5 shadow-lg'>
        <div className='prod-img mr-0 lg:mr-5 w-full lg:w-1/4'><img src={ProdImg} alt={product.name} /></div>
        <div className='flex-1 mt-5 lg:mt-0'>
            <h1 className="font-nunito text-3xl md:text-5xl !leading-[1.2] font-semibold mb-3">{product.name}</h1>
            {outStock && (
                 <div className='tag-outStock mb-3'>Out of Stock</div>
            )}
            <h2 className='font-bold mb-2'>Edit Product:</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="label !text-sm mb-1">Product Name</label>
                    <input required type="text" name="name" value={name} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
                </div>
                <div className="mb-4">
                    <label className="label !text-sm mb-1">Price</label>
                    <input type="number" name="price" value={price} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
                </div>
                <div className="mb-4">
                    <label className="label !text-sm mb-1">Quantity</label>
                    <input type="number" name="quantity" value={quantity} onChange={handleChange}  className="input rounded border border-gray-300 px-4" />
                </div>
                <div className='flex gap-2 sm:gap-0 justify-center sm:justify-between'>
                    <button type="submit" className="bt-primary w-full sm:w-auto">
                        Update Product
                    </button>
                    <button type='button' onClick={handleDelete} className="flex items-center text-base text-red-500">
                        <span className="material-symbols-rounded mb-1">delete</span>
                        Delete Product
                    </button>
                </div>
               
                {showMessage && (
                    <div className="text-green-500 font-semibold mt-2">
                        Product Successfully Updated!
                    </div>
                )

                }
            </form>
            
        </div>
    </div>
  )
}
