import React from 'react'
import { Link } from 'react-router-dom'
import BtnRenderer from '../../products/BtnRenderer'
import './productItem.css'

export default function ProductItem({product}) {
    return (
        <div className="product_card">
            <Link to={`/detail/${product._id}`} >
                <img src={product.images[0].url} alt={product.title + "'s Image"} />
                <div className="product_box">
                    <h2 title={product.title}>{product.title}</h2>
                    <span>${product.price}</span>
                    <p>{product.description}</p>
                </div>
            </Link>

            <div className="row_btn">
                <BtnRenderer />
            </div>
        </div>
    )
}
