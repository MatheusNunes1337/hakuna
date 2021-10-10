import { useState } from 'react'

function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        const data = {username, password}
        console.log(data)
    }

    return (
        <>
            <div className="login__container" onSubmit={handleLogin}>
                <form action="" className="login__form">
                    <h2 className="login__form__title">login</h2>
                    <label htmlFor="username" className="login__form__label">Username:</label>
                    <input type="text" className="login__form__input" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="username" className="login__form__label">Password:</label>
                    <input type="password" className="login__form__input" onChange={e => setPassword(e.target.value)} />
                    <button className="login__form__button">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login