import React from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import { useContext } from 'react/cjs/react.development'
import moment from 'moment'
import './orderHistory.css'

export default function OrderHistory() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    // const [isAdmin] = state.userAPI.isAdmin
    // const [token] = state.userAPI.token
    console.log("histroy", history)

    return (
        <div className="history-page">
            <h2>History</h2>

            <h4>Previously ordered {history.length} orders</h4>
        
            <table>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Products Brought</th>
                        <th>Date of Purchase</th>
                        <th>Payment ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.cart.length}</td>
                                    <td>{moment(item.createdAt).format("DD MMM, YYYY")}</td>
                                    <td><Link to={`/history/${item._id}`}>View</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
