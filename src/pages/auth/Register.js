import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { registerSchema } from '../../validations/authSchema'
import RegisterImage from '../../assets/images/boy_studying.png'

import '../../assets/css/styles.css'
import ErrorModal from '../../components/ErrorModal'

function Register() {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [type, setType] = useState('student')
    let [area, setArea] = useState(null)
    let [showModal, setModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')
    const history = useHistory()

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const userData = {
                username, email, password, type
            }
            if(area) {
                userData.area = area
                if(area == 'Área de atuação') userData.area = null
            } 
            await api.post('users', userData)
            history.push('/login')
        } catch(err) {
            if(!Array.isArray(err.response.data))
                handleErrorModal(err.response.data.name)
            else 
                handleErrorModal(err.response.data[0].name) 
        }
    }

    const closeModal = () => {
        setModalStatus(false)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setModalStatus(true)
    }

    return (
        <>
            <div className="form__container" onSubmit={handleRegister}>
                <form action="" className="register__form">
                    <h2 className="form__title">Cadastro</h2>
                    <label htmlFor="username" className="form__label">Usuário:</label>
                    <input type="text" className="form__input" onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="email" className="form__label">Email:</label>
                    <input type="email" className="form__input" onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="password" className="form__label">Senha:</label>
                    <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="type" className="form__label">Eu sou:</label>
                    <select name="type" className="form__select" onChange={e => setType(e.target.value)}>
                      <option value="student">estudante</option>
                      <option value="teacher">professor</option>
                    </select>
                    { type === 'teacher' 
                         ? (
                        <>
                            <label htmlFor="type" className="form__label">Área</label>
                            <input type="text" className="form__input" onChange={e => setArea(e.target.value)} />
                        </>    
                        ) 
                        : ''
                    }    
                    <button className="form__btn">Cadastrar</button>
                </form>
                <section className='register__section'>
                    <div className='register__image__wrapper'>
                        <img src={RegisterImage} alt='girl studying' className='register__image' />
                    </div>
                    <form action="" className="form__register">
                        <h2 className="form__register__title">Nova Conta</h2>
                        <input type="text" className="form__input" placeholder='Nome de usuário (6 a 12 caracteres)' onChange={e => setUsername(e.target.value)}/>
                        <input type="email" className="form__input" placeholder='Email ex: johndoe@gmail.com' onChange={e => setEmail(e.target.value)} />
                        <input type="password" className="form__input" placeholder='Senha (6 a 12 caracteres)' onChange={e => setPassword(e.target.value)} />
                        
                        <select name="type" className="form__select" onChange={e => setType(e.target.value)}>
                        <option value="" disabled selected hidden>Eu sou...</option>
                        <option value="student">estudante</option>
                        <option value="teacher">professor</option>
                        </select>
                        { type === 'teacher' 
                            ? (
                            <>
                                <select name="type" className="form__input" defaultValue="Área de atuação" onChange={e => setArea(e.target.value)}>
                                    {area == null ? <option value="Área de atuação">Área de atuação</option> : ''}
                                    <option value="matemática">Matemática</option>
                                    <option value="geografia">Geografia</option>
                                    <option value="física">Física</option>
                                    <option value="quimica">Química</option>
                                    <option value="filosofia">Filosofia</option>
                                    <option value="design">Design</option>
                                    <option value="programação">Programação</option>
                                    <option value="astronomia">Astronomia</option>
                                    <option value="inglês">Lingua estrangeira - inglês</option>
                                    <option value="espanhol">Lingua estrangeira - espanhol</option>
                                    <option value="coreano">Lingua estrangeira - coreano</option>
                                    <option value="música">Música</option>
                                    <option value="direito">Direito</option>
                                </select>
                            </>    
                            ) 
                            : ''
                        }    
                        <button className="form__register__btn">Cadastrar</button>
                        <Link to="/login" className="form__link">Já possui uma conta?</Link>
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

export default Register