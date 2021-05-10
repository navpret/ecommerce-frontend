import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function DeleteProduct(p_id) {
    const params = useParams()
    const {id} = params

    const deleteItem = () => {
        console.log("URL", `/api/products/${id}`)
        axios.delete(`/api/products/${id}`).then(() => {
            alert("Success! Deleted the product")
        }).catch(err => {
            alert(`Error ${err.response.status}: ${err.response.data.message}`)
        })
    }

    return (
        <div>
            <h2>Really Want to delete this Item?</h2>
            <button className="cart" onClick={deleteItem}>Delete</button>
            <button className="cart" onClick={deleteItem}>Go Back</button>
        </div>
    )
}
