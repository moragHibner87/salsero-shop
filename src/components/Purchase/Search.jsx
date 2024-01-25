
import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';

// handle Date Format
const dateFormat = (inputDate) => {
    const parts = inputDate.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
}

export default function Search({onSearch}) {
    const products = useSelector((state) => state.products.products);
    const customers = useSelector((state) => state.customers.customers);

    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();


    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case 'ProductID':
            setSelectedProduct(value);
            break;
          case 'CustomerID':
            setSelectedCustomer(value);
            break;
          case 'Date':
            setSelectedDate(value);
            break;
          default:
            break;
        }
    };

    const handleSearchClick = useCallback(() => {
        const searchCriteria = {
            ProductID: selectedProduct,
            CustomerID: selectedCustomer,
            Date: selectedDate? dateFormat(selectedDate) : ''
        };
        onSearch(searchCriteria)
    },[selectedProduct,selectedCustomer, selectedDate, onSearch])
    
    const clearAll = () => {
        setSelectedProduct('');
        setSelectedCustomer('');
        setSelectedDate('');

        const queryParams = new URLSearchParams();
        setSearchParams(queryParams.toString());

        onSearch()
    }

  return (
    <div className="bg-orange-200/50 p-5 rounded-md flex flex-col lg:flex-row lg:items-end gap-3 lg:gap-5">
        <div className="text-2xl mb-2">Search by:</div>
        <div>
            <label className="label !text-sm">Select Product:</label>
            <select name="ProductID" value={selectedProduct} onChange={handleChange} className="input rounded border border-gray-300 px-4">
                <option value="">All Products</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                    {product.name}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label className="label !text-sm">Select Customer:</label>
            <select name="CustomerID" value={selectedCustomer} onChange={handleChange} className="input rounded border border-gray-300 px-4">
                <option value="">All Customers</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label className="label !text-sm">Order Date:</label>
            <input type="date" name="Date" value={selectedDate} onChange={handleChange} className="input rounded border border-gray-300 px-4"/>
        </div>
        <div className="w-full xl:w-auto flex gap-2 items-center">
            <button onClick={handleSearchClick} className="bt-primary flex-1 lg:flex-none !px-8 mt-2">Search</button>
            <button type='button' onClick={clearAll} className="flex items-center text-base text-red-500 mt-2 lg:mt-4">
                <span className="material-symbols-rounded mb-1">delete</span>
                Clear All
            </button>
        </div>
    </div>
  )
}
