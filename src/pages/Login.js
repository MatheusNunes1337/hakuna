import { useState } from 'react'

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
                    <h2 className="login__title">login</h2>
                    <label htmlFor="username" className="login__label">Username:</label>
                    <input type="text" className="login__input" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="username" className="login__label">Password:</label>
                    <input type="password" className="login__input" onChange={e => setPassword(e.target.value)} />
                    <button className="login__button">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login