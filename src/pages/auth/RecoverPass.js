import React, { useState } from 'react'

import '../../assets/css/styles.css'

function RecoverPass() {
    let [email, setEmail] = useState('')
    

    const handleRecoverPass = async (e) => {
        e.preventDefault()

        try {
            const data = { email } 
        } catch(err) {
            alert(err.message)
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