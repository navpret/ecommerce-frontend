import axios from "axios"
import React, { useState } from "react"
import { Link } from 'react-router-dom'

export default function Register() {
    const [user, setUser] = useState({
        name: '',email: '', password: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user}).then(res => {
                localStorage.setItem('firstLogin', true)
                window.location.href = '/'
            }).catch(err => {
                alert(err.response.data.message)
            } )

        } catch (error) {
            alert(error.response.data.message)
        }
        
    }


    return (
        <div className="login-page">
        <h2>Register</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="name" name="text" required
                        placeholder="Name"
                        onChange={e => setUser({ ...user, name: e.target.value })}
                        value={user.name}
                />
                <input type="email" name="email" required
                    placeholder="Email"
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    value={user.email}
                />
                <input type="password" name="password" required
                onChange={e => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/login">Already a user? Login</Link>
                </div>
            </form>
        </div>
    )
}
