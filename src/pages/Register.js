import { useState } from 'react'

function Register() {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [type, setType] = useState('')
    let [area, setArea] = useState('')

    const handleRegister = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="register__container" onSubmit={handleRegister}>
                <form action="" className="register__form">
                    <h2 className="register__title">Register</h2>
                    <label htmlFor="username" className="register__label">Username:</label>
                    <input type="text" className="register__input" onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="email" className="register__label">Email:</label>
                    <input type="email" className="register__input" onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="password" className="register__label">Password:</label>
                    <input type="password" className="register__input" onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="type" className="register__label">I am:</label>
                    <select name="type" onChange={e => setType(e.target.value)}>
                      <option value="student">student</option>
                      <option value="teacher">teacher</option>
                    </select>
                    { type === 'teacher' 
                         ? (
                        <>
                            <label htmlFor="type" className="register__label">Area</label>
                            <input type="text" className="register__input" onChange={e => setArea(e.target.value)} />
                        </>    
                        ) 
                        : ''
                    }    
                    <button className="register__button">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register