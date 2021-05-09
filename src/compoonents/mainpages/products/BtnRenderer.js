import React, { useContext } from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'

export default function BtnRenderer({ product }) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    const NormalButtons = () => {
        return (
            <>
                <Link className="btn_buy" to="/cart" onClick={() => {addCart(product)}}>
                        Buy
                    </Link>
                <Link className="btn_cart" to="/cart">
                    +Cart
                </Link>
            </>
        )
    }

    const AdminButtons = () => {
        return (
            <>
                <Link className="btn_buy" to={`/delete_product/${product._id}`}>
                    Delete
                </Link>
                <Link className="btn_cart" to={`/edit_product/${product._id}`}>
                    Edit
                </Link>
            </>
        )
    }

    return (
        <>
            {isAdmin ? AdminButtons() : NormalButtons()}
        </>
    )
}
