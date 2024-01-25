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

    const fetchCollection = async (collectionName) => {
      try {
        const data = await getAll(collectionName);
        dispatch(
          collectionName === 'products'
            ? doInitProducts(data)
            : collectionName === 'customers'
            ? doInitCustomers(data)
            : doInitPurchases(data)
        );
      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
      }
    };
    useEffect(() => {
      fetchCollection('products');
      fetchCollection('customers');
      fetchCollection('purchases');
    }, [dispatch]);

  return (
    <div className='lg:flex gap-8'>
        <Header/>
        <main className='main-area  pt-10 px-5 lg:px-10 p-10 flex-1 min-h-[90svh]'>
          <Outlet/>
          <footer className='p-3 text-center text-gray-500'>© Never stop dancing | Made By 
              <a className='ml-2 text-orange-500' href='https://www.linkedin.com/in/morag-hibner-762400238/' target='_blank'>Morag Hibner</a>
          </footer>
        </main>

        {isModalOpen && (
            <Modal />
        )}
       
    </div>
  )
}
