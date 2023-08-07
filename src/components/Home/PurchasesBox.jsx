import {Link } from 'react-router-dom'
import { useSelector } from "react-redux";

export default function PurchasesBox() {
  const products = useSelector((state) => state.products.products)
  const purchases = useSelector((state) => state.purchases.purchases)

  const sortedPurchases = purchases.sort((a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    
    return dateB - dateA;
  });

  const renderPrice = (_id) => {
    const product = products.find((product) => product.id === _id)
    return product.price
  }

  return (
    <div className="bg-white rounded-md p-5 shadow-lg">
        <h2 className="text-xl text-gray-400 mb-4">Latest Purchases</h2>
        {purchases.length == 0? (
          <div className='border-t border-gray-300 py-4 text-center'>
            <span className="material-symbols-rounded my-4 text-gray-300 !text-[60px]">payments</span>
            <h2 className='text-2xl capitalize mb-5'>You have no Purchases yet..</h2>
            <Link to="/customers" className='bt-primary !inline-flex !px-9'>Start Buying</Link>
          </div>
        ) : (
          <> 
          <div className='mb-2'>
            { sortedPurchases.slice(0,3).map((purchase) => (
                <Link to="/purchases" key={purchase.id} className='border-t border-gray-300 py-4 flex justify-between items-center'>
                  <h2 className='text-lg font-bold'>{purchase.Date}</h2>
                  <div className='text-2xl'>
                    <span className="currency">$</span>
                    {renderPrice(purchase.ProductID)}
                  </div>
              </Link>
                ))}
          </div>
          <Link to="/purchases" className='bt-primary'>All Purchases</Link>
          </>
        )}
        
    </div>
  )
}
