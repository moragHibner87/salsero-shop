
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Search({onSearch}) {
    const products = useSelector((state) => state.products.products);
    const customers = useSelector((state) => state.customers.customers);

    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedDate, setSelectedDate] = useState('');


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

    const handleSearchClick = () => {
        const searchCriteria = {
            ProductID: selectedProduct,
            CustomerID: selectedCustomer,
            Date: selectedDate? new Date(selectedDate).toLocaleDateString() : ''
        };
        onSearch(searchCriteria)
    }
    const clearAll = () => {
        setSelectedProduct('');
        setSelectedCustomer('');
        setSelectedDate('');
        onSearch()
    }

  return (
    <div className="bg-orange-200/50 p-5 rounded-md flex items-end gap-5">
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
        <button onClick={handleSearchClick} className="bt-primary !px-8 mt-2">Search</button>
        <button type='button' onClick={clearAll} className="flex items-center text-base text-red-500 mb-1">
            <span className="material-symbols-rounded mb-1">delete</span>
            Clear All
        </button>
    </div>
  )
}
