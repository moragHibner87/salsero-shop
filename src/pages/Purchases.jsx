
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import {Link, useSearchParams } from 'react-router-dom'
import Search from "../components/Purchase/Search";
import ResultRow from "../components/Purchase/ResultRow";

export default function Purchases() {
  const purchases = useSelector((state) => state.purchases.purchases);
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredPurchases, setFilteredPurchases] = useState(purchases);

  useEffect(() => {
    if (purchases.length > 0) {
      setFilteredPurchases(purchases);
    }
    const params = searchParams.entries();
    const filters = {};
    for (const [key, value] of params) {
      filters[key] = value;
    }

    const filteredResults = purchases.filter((purchase) => {
      const productMatch = !filters.ProductID || purchase.ProductID === filters.ProductID;
      const customerMatch = !filters.CustomerID || purchase.CustomerID === filters.CustomerID;
      const dateMatch = !filters.Date || purchase.Date === filters.Date;
      return productMatch && customerMatch && dateMatch;
    });
    //console.log(filteredResults)
    setFilteredPurchases(filteredResults);

  }, [purchases, searchParams])

  const handleSearch = useCallback((searchData) => {
    if(!searchData) {
      return setFilteredPurchases(purchases);
    }

    const queryParams = new URLSearchParams();
    if (searchData.ProductID) queryParams.set('ProductID', searchData.ProductID);
    if (searchData.CustomerID) queryParams.set('CustomerID', searchData.CustomerID);
    if (searchData.Date) queryParams.set('Date', searchData.Date);

    setSearchParams(queryParams.toString());

  }, [purchases, searchParams]);


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
