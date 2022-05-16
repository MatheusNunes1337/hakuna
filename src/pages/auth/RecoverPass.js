import React, { useState } from 'react'
import api from '../../services/api'

import ForgotPassIcon from '../../assets/images/forgot_password.png'

import '../../assets/css/styles.css'

function RecoverPass() {
    let [email, setEmail] = useState('')
    

    const handleRecoverPass = async (e) => {
        e.preventDefault()

        try {
            const data = { receiverEmail: email }
            await api.post('recover', data)
            alert(`Foi enviado um e-mail para ${email} com orientações para a recuperação da sua conta. Verifique a sua caixa postal e caixa de spam.`)
            localStorage.setItem('emailRecover', email)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    return (
        <>
            <div className="form__container" onSubmit={handleRecoverPass}>
                <form action="" className="recoverPass__form">
                    <h2 className="form__title">Recuperar Conta</h2>
                    <label htmlFor="password" className="form__label">Digite o seu email:</label>
                    <input type="email" className="form__input" onChange={e => setEmail(e.target.value)} />
                    <button className="form__btn">Recuperar</button>
                </form>
                <section className='recoverPass__section'>
                    <div className='recoverPass__image__wrapper'>
                        <img src={ForgotPassIcon} alt='girl studying' className='recoverPass__image' />
                    </div>
                    <form className="form__recoverPass">
                        <h2 className="form__recoverPass__title">Esqueceu a sua senha?</h2>
                        <p className="form__recoverPass__message">Não tem problema! Digite abaixo o seu endereço de e-mail correspondente ao seu cadastro para a redefinição da sua senha.</p>
                        <label htmlFor="password" className="form__label">Email</label>
                        <input type="email" className="form__input" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                        <button className="recoverPass__btn">Recuperar</button>
                    </form> 
                </section>
            </div>
        </>
    )
}

export default RecoverPass