import { NavLink } from "react-router-dom"
import Logo from '../assets/logo-salsero.svg'

export default function Header() {
  return (
    <header className="w-[300px] bg-white shadow-lg h-[100svh] overflow-auto has-scroll fixed lg:sticky top-0 p-6">
        <NavLink to="/"><img className="w-[80%]" src={Logo} alt="Salsero Shop"/></NavLink>
        <div className="wrap-nav mt-5"> 
            <nav className="main-nav font-nunito">
                <ul>
                    <li>
                        <NavLink to="/" end
                            className={({isActive}) => isActive ? 'nav-active' : ''}
                        >
                            <span className="material-symbols-rounded mr-2">home</span>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products"
                            className={({isActive}) => isActive? 'nav-active' : ''}
                        >
                            <span className="material-symbols-rounded mr-2">inventory_2</span>
                            Products</NavLink>
                    </li>
                    <li>
                        <NavLink to="/customers"
                            className={({isActive}) => isActive? 'nav-active' : ''}
                        >
                            <span className="material-symbols-rounded mr-2">person</span>
                            Customers</NavLink>
                    </li>
                    <li>
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
  )
}
