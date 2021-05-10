import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { GlobalState } from '../../../GlobalState'
import './orderHistory.css'

export default function OrderDetails() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        if (params.id) {
            console.log("History", history)
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            }) 
        }

    }, [])

    console.log("Order details", orderDetails)

    if (orderDetails.length === 0) return null

    let sum = 0
    orderDetails.cart.forEach(item => sum+=(item.price*item.quantity))

    return (
        <div className="history-page">
            <h1>Order Summary</h1>
            <h3>Order ID: {orderDetails._id}</h3>
            <h3>Types of Items purchased: {orderDetails.cart.length}</h3>
            <h3>Dated: {moment(orderDetails.createdAt).format("DD MMM, YYYY at HH:MM:SS")}</h3>

            <h4>Order reciept</h4>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td><img src={item.images[0].url} alt="" /></td>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>$ {item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td><strong>$ {item.quantity * item.price}</strong></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <h4>SubTotal: {sum}</h4>
        </div>
    )
}
