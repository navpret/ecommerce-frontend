import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import './cart.css'

export default function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    // const addCart = state.userAPI.addCart
    const [token] = state.userAPI.token
    const [total, setTotal] = useState(0) 

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()
    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart' , {cart}, {
            headers: { Authorization: token }
        })
    }

    const increment = (id)  => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity++
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id)  => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity > 1 && item.quantity--
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const remove = id => {
        if (window.confirm("Really wanna delete this item?")){
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }

    const transactionSuccess = async () => {
        await axios.post('/api/order', {
            cart, 
        }, { headers: {
            Authorization: token
        } })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order")
    }

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
                            <div className="detail card" key={product._id}>
                                <img src={product.images && product.images[0].url} alt={product.title} className="img_container" />
                                <div className="box-detail">
                                    <h2>{product.title}</h2>
                                    <h3>$ {product.price * product.quantity}</h3>
                                    <span>($ {product.price})</span>
                                    <p>{product.description}</p>
                                    <p>{product.content}</p>
                                    <div className="amount">
                                        <button onClick={() => decrement(product._id)}> - </button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => increment(product._id)}> + </button>
                                    </div>
                                    <div className="delete" onClick={() => remove(product._id)}>X</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="total">
                <h3>Total: $ {total}</h3>
                <button onClick={transactionSuccess}>Payment -&gt;</button>
            </div>
        </div>
    )
}
