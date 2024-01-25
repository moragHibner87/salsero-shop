import {Link } from 'react-router-dom'
import Logo from '../assets/logo-salsero.svg'

export default function ErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70svh] lg:min-h-[80svh] p-8 pb-20'>
      <Link to='/' className='mb-5'>
        <img className='w-[200px]' src={Logo} alt='Logo Salsero' />
      </Link>
      <h1 className='text-6xl font-bold text-gray-900 mb-1'>404</h1>
      <h2 className='text-2xl text-gray-900'>Page Not Found</h2>
      <Link to='/'>
        <button className='bt-primary !px-8 mt-3'>
          Go Home
        </button>
      </Link>
    </div>
  )
}
