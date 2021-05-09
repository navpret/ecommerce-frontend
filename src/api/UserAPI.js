import axios from 'axios'
import { useState, useEffect } from 'react'

export default function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    axios.get('/user/infor', {
                        headers: { Authorization: token }
                    }).then(res => {
                        setIsLogged(true)
                        res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    })

                } catch (error) {
                    alert(error)
                }
            }

            getUser()
        }
    }, [token])

    const addCart = async (product) => {
        if (!isLogged) return alert("You need to be logged in to add to cart")
    
        const check = cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            setCart([...cart, {...product, quantity: 1}])

            axios.patch('/addcart', { cart: [ ...cart, { ...product, quantity: 1 } ] }, {
                headers: { Authorization: token }
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
        addCart: addCart
    }
}
