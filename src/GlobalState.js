import axios from 'axios'
import React, { createContext, useState,useEffect } from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)

    useEffect(() => {
        const previousLogin = localStorage.getItem('firstLogin')

        if (previousLogin) {
            const refreshToken = async () => {
                axios.get('/user/refresh_token').then(res => {
                    setToken(res.data.accesstoken)
                }).catch(err => {
                    alert(err.response.data.message)
                })
            }
            refreshToken()
        }
    }, [])

    ProductsAPI()
    const state = {
        token: [ token, setToken ],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            { children }
        </GlobalState.Provider>
    )
}