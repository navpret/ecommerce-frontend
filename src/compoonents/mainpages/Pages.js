import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import Products from './products/Products'
import DetailProduct from '../mainpages/detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/notfound/NotFound'

export default function Pages() {
    const state = useContext(GlobalState)
    const [ isLogged ] = state.userAPI.isLogged

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/login" exact component={isLogged? NotFound: Login} />
            <Route path="/register" exact component={isLogged? NotFound: Register} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}
