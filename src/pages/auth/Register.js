import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import { registerSchema } from '../../validations/authSchema'

import '../../assets/css/styles.css'

function Register() {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [type, setType] = useState('student')
    let [area, setArea] = useState(null)
    const history = useHistory()

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const userData = {
                username, email, password, type
            }
            if(area) {
                userData.area = area
            } 
            const {data} = await axios.post('http://hakunaa-api.herokuapp.com/api/auth/register', userData)
            localStorage.setItem('userToken', data.token)
            history.push('/home')
        } catch(err) {
            alert(err.response.data.error)
        }
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
                    <label htmlFor="type" className="form__label">I am:</label>
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
                <Link to="/login" className="form__link">Já possui uma conta?</Link>
            </div>
        </>
    )
}

export default Register