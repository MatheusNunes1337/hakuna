import React, {useState} from 'react'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import {FaSave} from 'react-icons/fa'

export default function UserConfig() {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [type, setType] = useState('teacher')
    let [area, setArea] = useState('')
    let [hidePassField, setVisibility] = useState('true')

    const handleUser = () => {
      console.log('alterações realizadas com sucesso')
    }

    const changePassword = () => {
      alert('Senha modificada com sucesso')
      setVisibility('true')
    }

    const showPasswordField = () => {
      setVisibility('false')
    }

    return (
        <>
        <NavBar />
        <main>
          <Container>
            <SearchBar />
            <Aside />
            <div className="content">
                <h2 className="content__title">Configurações da conta</h2>
                <form action="" className="user__form">
                    <label htmlFor="username" className="form__label">Usuário:</label>
                    <input type="text" className="form__input" onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="email" className="form__label">Email:</label>
                    <input type="email" className="form__input" onChange={e => setEmail(e.target.value)} />
                    { type === 'teacher' 
                         ? (
                        <>
                            <label htmlFor="type" className="form__label">Área</label>
                            <input type="text" className="form__input" onChange={e => setArea(e.target.value)} />
                        </>    
                        ) 
                        : ''
                    }
                    { hidePassField === 'false' 
                         ? (
                        <>
                          <div className="form__group">
                            <label htmlFor="password" className="form__label">Senha:</label>
                            <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                            <button type="button" className="password__btn" onClick={changePassword}><FaSave className="form__icon"/></button>
                          </div>
                        </>    
                        ) 
                        : ''
                    }    
                    <div className="button__group">
                      <button className="form__btn">Salvar</button>
                      <button type="button" className="form__btn" onClick={showPasswordField}>Alterar senha</button>
                    </div>
                </form>
            </div>
          </Container >  
        </main>  
        </>
    )
}
