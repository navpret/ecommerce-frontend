import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import Products from './products/Products'
import DetailProduct from '../mainpages/detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import AddProduct from '../mainpages/addProduct/AddProduct'
import DeleteProduct from '../mainpages/deleteProduct/DeleteProduct'
import NotFound from './utils/notfound/NotFound'

export default function Pages() {
    const state = useContext(GlobalState)
    const [ isLogged ] = state.userAPI.isLogged
    const [ isAdmin ] = state.userAPI.isAdmin

    return (
        <Switch>
            {/* General Functions */}
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            {/* User Functions */}
            <Route path="/login" exact component={isLogged? NotFound: Login} />
            <Route path="/register" exact component={isLogged? NotFound: Register} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/history" exact component={isLogged? OrderHistory: Login} />
            <Route path="/history/:id" exact component={isLogged? OrderDetails: Login} />

            {/* Admin Functions */}
            <Route path="/add_product" component={isAdmin? AddProduct: NotFound} />
            <Route path="/delete_product/:id" component={isAdmin? DeleteProduct: NotFound} />

            {/* Miscellaneous Functions */}
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}
