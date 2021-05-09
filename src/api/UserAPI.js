import axios from 'axios'
import { useState, useEffect } from 'react'

export default function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callback, setCallback] = useState(false)

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

            const getHistory = async () => {
                const res = await axios.get('/user/history', {
                    headers: {
                        Authorization: token
                    }
                })

                setHistory(res.data)
            }


            getUser()
            getHistory()
        }
    }, [token, callback])


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
        isAdmin: [ isAdmin, setIsAdmin ],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback]
    }
}
