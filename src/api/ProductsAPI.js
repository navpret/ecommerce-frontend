import axios from 'axios'
import { useState, useEffect } from 'react'

export default function ProductsAPI() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        axios.get('/api/products').then(res => {
            console.log(res.data.products)
            setProducts(res.data.products)
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        {products: [products, setProducts]}
    )
}
