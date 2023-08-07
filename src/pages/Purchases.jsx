
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {Link } from 'react-router-dom'
import Search from "../components/Purchase/Search";
import ResultRow from "../components/Purchase/ResultRow";

export default function Purchases() {
  const purchases = useSelector((state) => state.purchases.purchases);
  const [filteredPurchases, setFilteredPurchases] = useState(purchases);

  useEffect(() => {
    if (purchases.length > 0) {
      setFilteredPurchases(purchases);
    }
  }, [purchases])

  const handleSearch = (searchData) => {
    if(!searchData) {
      return setFilteredPurchases(purchases);
    }
    const filteredResults = purchases.filter((purchase) => {
      const productMatch = !searchData.ProductID || purchase.ProductID === searchData.ProductID;
      const customerMatch = !searchData.CustomerID || purchase.CustomerID === searchData.CustomerID;
      const dateMatch = !searchData.Date || purchase.Date === searchData.Date;
      return productMatch && customerMatch && dateMatch;
    });

    setFilteredPurchases(filteredResults);
  };


  return (
    <div>
       <div className="flex items-center justify-between">
            <h1 className="font-nunito text-3xl md:text-5xl !leading-[1.2] font-semibold mb-3">
              Purchases <sup className="text-orange-500 text-[.6em]">{purchases.length > 0 && purchases.length}</sup>
            </h1>
        </div>
        {purchases.length == 0 ? (
          <div>
            <div className='py-8 text-center'>
              <span className="material-symbols-rounded my-4 text-orange-500 !text-[70px]">payments</span>
              <h2 className='text-2xl capitalize mb-5'>You have no Purchases yet..</h2>
              <Link to="/customers" className='bt-primary !inline-flex !px-9'>Start Buying</Link>
            </div>
          </div>
        ) : (
          <>
          <Search onSearch={handleSearch}/>
          <div className="all-results mt-5">
            {filteredPurchases.length > 0 && (
              <div className="mb-4">{filteredPurchases.length} Results</div>
            )}
              
            {filteredPurchases.length > 0? (
                filteredPurchases.map(purchase => (
                  <ResultRow key={purchase.id} purchase={purchase}/>
                ))
              ) : (
                <div className='text-center p-6 text-2xl'>
                    <span className="material-symbols-rounded">
                        sentiment_dissatisfied
                    </span>
                    <h2 className="text-2xl mb-2">No matching results found.</h2>
                    <p className="text-gray-500 text-base">Please clear all filters and try again </p>
                </div>
            )}
          </div>
          </>
        )}

    </div>
  )
}
