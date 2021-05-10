import React, { useContext } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import './addProduct.css'

export default function AddProduct() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <div className="add-product">
            <div className="left-side">

            </div>
            <div className="right-side">

            </div>
        </div>
    )
}
