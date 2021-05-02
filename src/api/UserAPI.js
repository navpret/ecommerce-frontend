import axios from 'axios'
import { useState, useEffect } from 'react'

export default function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (error) {
                    alert(error)
                }
            }

            getUser()
        }
    }, [token])
    return {
        isLogged: [ isLogged, setIsLogged ],
        isAdmin: [ isAdmin, setIsAdmin ]
    }
}
