import React, { useState } from 'react'
import api from '../../services/api'

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
            </div>
        </>
    )
}

export default RecoverPass