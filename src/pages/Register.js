import { useState } from 'react'

function Register() {


    return (
        <>
            <div className="register__container" onSubmit={handleRegister}>
                <form action="" className="register__form">
                    <h2 className="register__title">Register</h2>
                    <label htmlFor="username" className="register__label">Username:</label>
                    <input type="text" className="register__input" />
                    <label htmlFor="email" className="register__label">Email:</label>
                    <input type="email" className="register__input" />
                    <label htmlFor="password" className="register__label">Password:</label>
                    <input type="password" className="register__input" />
                    <label htmlFor="type" className="register__label">I am:</label>
                    <select name="school" onChange={e => setType(e.target.value)}>
                      <option value="student">student</option>
                      <option value="teacher">student</option>
                    </select>
                    <label htmlFor="type" className="register__label">Area</label>
                    <input type="text" className="register__input" />
                    <button className="register__button">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register