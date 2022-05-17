import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import ForgotPassIcon from '../../assets/images/forgot_password.png'

import '../../assets/css/styles.css'
import SucessModal from '../../components/SucessModal'
import ErrorModal from '../../components/ErrorModal'

function RedefinePass() {
    let [password, setPassword] = useState('')
    let [password02, setPassword02] = useState('')
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showSucessModal, setSucessModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const history = useHistory()

    const handleRedefinePass = async (e) => {
        e.preventDefault()

        try {
            if(password !== password02) {
                handleErrorModal('The two passwords you entered are different')
            }
            const email = localStorage.getItem('emailRecover')
            await api.patch(`recover/${email}`, { password })
            handleSucessModal('Senha redefinida com sucesso')
            history.push('/login')
        } catch(err) {
            if(!Array.isArray(err.response.data))
                handleErrorModal(err.response.data.name)
            else 
                handleErrorModal(err.response.data[0].name)
        }
    }

    const closeModal = () => {
        setErrorModalStatus(false)
        setSucessModalStatus(false)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setErrorModalStatus(true)
    }

    const handleSucessModal = (message) => {
        setModalMessage(message)
        setSucessModalStatus(true)
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
                {
                    showErrorModal ? (
                    <>
                        <ErrorModal closeModal={closeModal} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
                {
                    showSucessModal ? (
                    <>
                        <SucessModal closeModal={closeModal} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
            </div>
        </>
    )
}

export default RedefinePass