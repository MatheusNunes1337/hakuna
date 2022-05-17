import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import '../../assets/css/styles.css'

import LoginImage from '../../assets/images/girl_studying.png'
import ErrorModal from '../../components/ErrorModal'

function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [showModal, setModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')
    const history = useHistory()

     const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const userData = {username, password}
            const {data} = await api.post('authentication', userData)
            localStorage.setItem('userToken', data.token)
            localStorage.setItem('userId', data.id)
            history.push('/home')
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }
    }

    const closeModal = () => {
        setModalStatus(false)
    }

    const handleErrorModal = (message) => {
        console.log('message', message)
        setModalMessage(message)
        setModalStatus(true)
        console.log('modal message', modalMessage)
    }

    return (
        <>
            <div className="form__container">
                <form action="" className="login__form" onSubmit={handleLogin}>
                    <h2 className="form__title">Login</h2>
                    <label htmlFor="username" className="form__label">Usuário:</label>
                    <input type="text" className="form__input" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="username" className="form__label">Senha:</label>
                    <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                    <button className="form__btn">Login</button>
                    <Link to="/recover-pass" className="form__link">Esqueceu sua senha?</Link>
                </form>
                <section className='login__section'>
                    <div className='login__image__wrapper'>
                        <img src={LoginImage} alt='girl studying' className='login__image' />
                    </div>
                    <form action="" className="form__login" onSubmit={handleLogin}>
                        <h2 className="form__login__title">Bem-vindo(a) de volta!</h2>
                        <label htmlFor="username" className="form__label">Nome de usuário</label>
                        <input type="text" placeholder='Nome de usuário' className="form__input" onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="username" className="form__label">Senha</label>
                        <input type="password" placeholder='Senha' className="form__input" onChange={e => setPassword(e.target.value)} />
                        <Link to="/recover-pass" className="form__link">Esqueceu sua senha?</Link>
                        <button className="form__login__btn">Entrar</button>
                        <Link to="/register" className="form__link">Crie uma conta</Link>
                    </form>
                </section>
                {
                    showModal ? (
                    <>
                        <ErrorModal closeModal={closeModal} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
            </div>
        </>
    )
}

export default Login