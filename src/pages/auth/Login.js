import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import '../../assets/css/styles.css'

function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    const history = useHistory()

     const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const userData = {username, password}
            const {data} = await api.post('auth/login', userData)
            localStorage.setItem('userToken', data.token)
            localStorage.setItem('userId', data.id)
            history.push('/home')
        } catch(err) {
            alert(err.response.data.error)
        }
    }

    return (
        <>
            <div className="form__container">
                <form action="" className="login__form" onSubmit={handleLogin}>
                    <h2 className="form__title">Login</h2>
                    <label htmlFor="username" className="form__label">Usuário:</label>
                    <input type="text" className="form__input" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="username" className="form__label">senha:</label>
                    <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                    <button className="form__btn">Login</button>
                    <Link to="/recover-pass" className="form__link">Esqueceu sua senha?</Link>
                </form>
            </div>
        </>
    )
}

export default Login