import React, { useState } from 'react'
import api from '../../services/api'

import ForgotPassIcon from '../../assets/images/forgot-password.png'

import '../../assets/css/styles.css'
import ErrorModal from '../../components/ErrorModal'
import MailModal from '../../components/MailModal'

function RecoverPass() {
    let [email, setEmail] = useState('')
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showMailModal, setMailModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')
    

    const handleRecoverPass = async (e) => {
        e.preventDefault()

        try {
            const data = { receiverEmail: email }
            await api.post('recover', data)
            handleMailModal(`Foi enviado um e-mail para ${email} com orientações para a recuperação da sua conta. Verifique a sua caixa postal e caixa de spam.`)
            localStorage.setItem('emailRecover', email)
        } catch(err) {
            if(!Array.isArray(err.response.data))
                handleErrorModal(err.response.data.name)
            else 
                handleErrorModal(err.response.data[0].name)
        }
    }

    const closeModal = () => {
        setErrorModalStatus(false)
        setMailModalStatus(false)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setErrorModalStatus(true)
    }

    const handleMailModal = (message) => {
        setModalMessage(message)
        setMailModalStatus(true)
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
                {
                    showErrorModal ? (
                    <>
                        <ErrorModal closeModal={closeModal} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
                {
                    showMailModal ? (
                    <>
                        <MailModal closeModal={closeModal} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
            </div>
        </>
    )
}

export default RecoverPass