import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './cart.css'

export default function Cart() {
    const state = useContext(GlobalState)
    const [cart] = state.userAPI.cart
    const [total, setTotal] = useState(0) 

    if (cart.length === 0) {
        return (
            <h1 style={{textAlign: "center"}}>Cart is empty</h1>
        )
    }

    return (
        <div className="cart">
            <div>
                {
                    cart.map(product => {
                        return (
                            <div className="detail card">
                                <img src={product.images[0].url} alt={product.title} className="img_container" />
                                <div className="box-detail">
                                    <h2>{product.title}</h2>
                                    <span>$ {product.price * product.quantity}</span>
                                    <p>{product.description}</p>
                                    <p>{product.content}</p>
                                    <div className="amount">
                                        <button> - </button>
                                        <span>{product.quantity}</span>
                                        <button> + </button>
                                    </div>
                                    <div className="delete">X</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="total">
                <h3>Total: $ {total}</h3>
                <Link to="#">Payment</Link>
            </div>
        </div>
    )
}
