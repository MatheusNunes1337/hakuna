import React, { useState } from 'react'

import { loginSchema } from '../validations/authSchema'

function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

     const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const data = {username, password}
            const isNumber = parseInt(data.username)
            if(isNumber) {
                throw new Error('The username must be a string!')
            }
            await loginSchema.validate(data)
        } catch(err) {
            alert(err.message)
        }
    }

    return (
        <>
            <div className="login__container" onSubmit={handleLogin}>
                <form action="" className="login__form">
                    <h2 className="form__title">Login</h2>
                    <label htmlFor="username" className="form__label">Usuário:</label>
                    <input type="text" className="form__input" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="username" className="form__label">senha:</label>
                    <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                    <button className="form__btn">Login</button>
                    <a href="/" className="form__link">Esqueceu sua senha?</a>
                </form>
                <a href="/" className="form__link">Ainda não possui uma conta?</a>
            </div>
        </>
    )
}

export default Login