import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import { List, X, Cart } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './header.css'

export default function Header() {
    
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        window.location.href = "/"
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/add_product">Add Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu small">
                <List className="bi" />
            </div>

            <div className="logo">
                <h1>
                    <Link to='/'>ShopinGo</Link>
                    {isAdmin? <span className="subtext">Admin</span> : ""}
                </h1>
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? 'Products': 'Shop'}</Link></li>
                
                { isAdmin && adminRouter() }
                {
                    isLogged ? loggedRouter() : <Link to="/login">Login | Register</Link>
                }

                <li>
                    <X className="bi small"/>
                </li>
            </ul>
            
            {isAdmin ? '' :
                <div className="bi cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <Cart />
                    </Link>
                </div>
            }

        </header>
    )
}
