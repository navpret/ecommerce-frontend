import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'

export default function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callback, setCallback] = useState(false)

    const getHistory = useCallback(async () => {
        if (isAdmin) {
            const res = await axios.get('/user/order', {
                headers: {
                    Authorization: token
                }
            })
            setHistory(res.data)
        } else {
            const res = await axios.get('/user/history', {
                headers: {
                    Authorization: token
                }
            })
            setHistory(res.data)
        }
    }, [isAdmin, token])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    axios.get('/user/infor', {
                        headers: { Authorization: token }
                    }).then(res => {
                        setIsLogged(true)
                        res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                        setCart(res.data.cart)
                    })

                } catch (error) {
                    alert(error)
                }
            }

            getUser()
            getHistory()
        }
    }, [token, callback, isAdmin, isLogged, getHistory])


    const addCart = async (product) => {
        if (!isLogged) return alert("You need to be logged in to add to cart")
    
        const check = cart.every(item => {
            return item._id !== product._id
        })
        if (check) {

            axios.patch('/user/addcart', { cart: [ ...cart, { ...product, quantity: 1 } ] }, {
                headers: { Authorization: token }
            }).then(res => {
                
                setCart([ ...cart, { ...product, quantity: 1 } ])
            }).catch(err => {
                alert(err)
            })
        } else {
            alert("This product is already in cart")
        }
    }

    return {
        isLogged: [ isLogged, setIsLogged ],
        token: [token],
        isAdmin: [ isAdmin, setIsAdmin ],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback]
    }
}
