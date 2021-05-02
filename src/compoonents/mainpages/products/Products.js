import React, { useContext } from 'react'
import ProductItem from '../utils/productitem/ProductItem'
import { GlobalState } from '../../../GlobalState'
import './product.css'

export default function Products() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products

    return (
        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product} />
                })
            }
        </div>
    )
}
