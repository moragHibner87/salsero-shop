import { Outlet } from 'react-router-dom'
import {db, getAll} from '../firebase'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doInitProducts } from '../redux/actions/actionProduct'
import { doInitCustomers } from '../redux/actions/actionCustomers'
import { doInitPurchases } from '../redux/actions/actionPurchase'
import Header from '../components/Header'
import Modal from '../components/modal/Modal'

export default function Layout() {
    const isModalOpen = useSelector((state) => state.modal.isModalOpen)
    const dispatch = useDispatch()

    useEffect(() => {
      let cleanUp = false;

        // Fetch Products
        const fetchProducts = async () => {
            try {
              const products = await getAll("products");
              //console.log('products ', products)
              if (!cleanUp) {
                dispatch(doInitProducts(products));
              }
            } catch (error) {
              console.error("Error fetching products:", error);
            }
        };
        fetchProducts();

        // Fetch Customers
        const fetchCustomers = async () => {
            try {
              const customers = await getAll("customers");
              //console.log('customers: ', customers)
              if (!cleanUp) {
                dispatch(doInitCustomers(customers));
              }
            } catch (error) {
              console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();

        // Fetch Purchases
        const fetchPurchases = async () => {
            try {
              const purchases = await getAll("purchases");
              //console.log('purchases', purchases)
              if (!cleanUp) {
                dispatch(doInitPurchases(purchases));
              }
            } catch (error) {
              console.error("Error fetching purchases:", error);
            }
        };
        fetchPurchases();

        return () => {
          console.count('cleanUp')
          cleanUp = true;
        };

    }, [dispatch])

  return (
    <div className='flex gap-8'>
        <Header/>
        <main className='main-area pt-20 lg:pt-10 px-5 lg:px-10 p-10 flex-1'>
            <div className='min-h-[90svh]'>
                <Outlet/>
            </div>
            <footer className='p-3 text-center text-gray-500'>© Never stop dancing</footer>
        </main>

        {isModalOpen && (
            <Modal />
        )}
       
    </div>
  )
}
