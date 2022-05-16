import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import ForgotPassIcon from '../../assets/images/forgot_password.png'

import '../../assets/css/styles.css'

function RedefinePass() {
    let [password, setPassword] = useState('')
    let [password02, setPassword02] = useState('')
    const history = useHistory()

    const handleRedefinePass = async (e) => {
        e.preventDefault()

        try {
            if(password !== password02) {
                throw new Error('The two passwords you entered are different')
            }
            const email = localStorage.getItem('emailRecover')
            await api.patch(`recover/${email}`, { password })
            alert('Senha redefinida com sucesso')
            history.push('/login')
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    return (
        <>
            <div className="form__container">
                <form action="" className="redefinePass__form">
                    <h2 className="form__title">Redefinir Senha</h2>
                    <label htmlFor="password" className="form__label">Nova senha:</label>
                    <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="password" className="form__label">Digite sua senha novamente:</label>
                    <input type="password" className="form__input" onChange={e => setPassword02(e.target.value)} />
                    <button className="form__btn" onClick={handleRedefinePass}>Redefinir</button>
                </form>
                <section className='redefinePass__section'>
                    <div className='redefinePass__image__wrapper'>
                        <img src={ForgotPassIcon} alt='girl studying' className='redefinePass__image' />
                    </div>
                    <form className="form__redefinePass">
                        <h2 className="form__recoverPass__title">Redefinir senha</h2>
                        <label htmlFor="password" className="form__label">Nova senha</label>
                        <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password" className="form__label">Digite sua senha novamente</label>
                        <input type="password" className="form__input" onChange={e => setPassword02(e.target.value)} />
                        <button className="form__recoverPass__btn" onClick={handleRedefinePass}>Redefinir</button>
                    </form> 
                </section>
            </div>
        </>
    )
}

export default RedefinePass