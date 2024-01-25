import { useState } from "react" 
import { NavLink } from "react-router-dom"
import Logo from '../assets/logo-salsero.svg'

export default function Header() {
    const [openNav, setOpenNav] = useState(false);
  return (
    <>
    <header className={`side w-[85%] lg:w-[300px] bg-white shadow-lg h-[100svh] overflow-auto has-scroll fixed lg:sticky top-0 py-4 lg:py-6 px-6 z-[5]
    ${openNav? '!translate-x-0' : ''} 
    `}>
        <NavLink to="/"><img className="hidden lg:block w-[80%]" src={Logo} alt="Salsero Shop"/></NavLink>
        <div className='lg:hidden flex justify-end'>
            <button onClick={() => setOpenNav(!openNav)} className='text-black/90 text-2xl flex items-center'>
                <span className="material-symbols-rounded">arrow_right_alt</span>
            </button>
        </div>
        <div className="wrap-nav mt-5"> 
            <nav className="main-nav font-nunito">
                <ul>
                    <li onClick={() => setOpenNav(false)}>
                        <NavLink to="/" end
                            className={({isActive}) => isActive ? 'nav-active' : ''}
                        >
                            <span className="material-symbols-rounded mr-2">home</span>
                            Home</NavLink>
                    </li>
                    <li onClick={() => setOpenNav(false)}>
                        <NavLink to="/products"
                            className={({isActive}) => isActive? 'nav-active' : ''}
                        >
                            <span className="material-symbols-rounded mr-2">inventory_2</span>
                            Products</NavLink>
                    </li>
                    <li onClick={() => setOpenNav(false)}>
                        <NavLink to="/customers"
                            className={({isActive}) => isActive? 'nav-active' : ''}
                        >
                            <span className="material-symbols-rounded mr-2">person</span>
                            Customers</NavLink>
                    </li>
                    <li onClick={() => setOpenNav(false)}>
                        <NavLink to="/purchases"
                            className={({isActive}) => isActive? 'nav-active' : ''}
                        >
                            <span className="material-symbols-rounded mr-2">payments</span>
                            Purchases</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <div className="mobile-header lg:hidden flex justify-between bg-white sticky top-0 w-full z-[4] shadow-xl p-4 py-3">
        <NavLink to="/"><img className="w-[160px]" src={Logo} alt="Salsero Shop"/></NavLink>
        <button onClick={() => setOpenNav(!openNav)} className="text-black/90 text-2xl flex items-center">
            <span className="material-symbols-rounded">menu_open</span>
        </button>
    </div>
    </>
  )
}
