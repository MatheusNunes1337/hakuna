import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { redefinePassSchema } from '../../validations/authSchema'

import '../../assets/css/styles.css'

function RedefinePass() {
    let [password, setPassword] = useState('')
    let [password02, setPassword02] = useState('')
    

    const handleRedefinirSenha = async (e) => {
        e.preventDefault()

        try {
            if(password !== password02) {
                throw new Error('The two passwords you entered are different')
            }
            const data = { password } 
            await redefinePassSchema.validate(data)
        } catch(err) {
            alert(err.message)
        }
    }

    return (
        <>
            <div className="form__container" onSubmit={handleRedefinirSenha}>
                <form action="" className="redefinePass__form">
                    <h2 className="form__title">Redefinir Senha</h2>
                    <label htmlFor="password" className="form__label">Nova senha:</label>
                    <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="password" className="form__label">Digite sua senha novamente:</label>
                    <input type="password" className="form__input" onChange={e => setPassword02(e.target.value)} />
                    <button className="form__btn">Redefinir</button>
                </form>
            </div>
        </>
    )
}

export default RedefinePass