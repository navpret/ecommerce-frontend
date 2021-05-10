import React from 'react'
import { Link } from 'react-router-dom'
import BtnRenderer from '../../products/BtnRenderer'
import './productItem.css'

export default function ProductItem({product, isAdmin }) {
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} />
            }   
            <Link to={`/detail/${product._id}`} >
                <img src={product.images[0].url} alt={product.title + "'s Image"} />
                <div className="product_box">
                    <h2 title={product.title}>{product.title}</h2>
                    <span>${product.price}</span>
                    <p>{product.description}</p>
                </div>
            </Link>

            <div className="row_btn">
                <BtnRenderer product={product} />
            </div>
        </div>
    )
}
