import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productitem/ProductItem'
import './detailProducts.css'

export default function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if (detailProduct.length === 0) return null

    const related = products.map(
        product => {
            return product.category === detailProduct.category && product._id !== detailProduct._id
                ? <ProductItem key={product._id} product={product} /> : null
        }
    )
    
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images[0].url} alt="none"/>
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.product_id}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>{detailProduct.sold} people bought these {detailProduct.category}</p>
                    <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>Buy Now</Link>
                </div>
            </div>
            <div className="related">
                {!related.every(relation => relation === null ) ? <h2>Related Products</h2>: null}
                <div className="products">
                    {related}
                </div>
            </div>
        </>
    )
}
