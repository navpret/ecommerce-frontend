import React, { useContext } from 'react'
import ProductItem from '../utils/productitem/ProductItem'
import { GlobalState } from '../../../GlobalState'
import './product.css'

export default function Products() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                        isAdmin={isAdmin}
                    />
                })
            }
        </div>
    )
}
