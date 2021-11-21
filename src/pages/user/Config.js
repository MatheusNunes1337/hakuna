import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

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

    const history = useHistory()
    const id =  localStorage.getItem('userId')
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
      const getUser = async () => {
        try {
          console.log('TOKEN', token)
          console.log('id', id)
          const {data} = await axios.get(`http://localhost:8080/api/users/${id}`, {headers})
          const {username, email, type, area} = data
          setUsername(username)
          setEmail(email)
          setType(type)
          setArea(area)
        } catch(err) {
          alert(err.response.data.error)
        }
      }

      getUser()
    }, [])

    const handleUser = async (e) => {
      e.preventDefault()

      try {
        const payload =  {username, email, type, area}
        console.log('payload', payload)
        await axios.put(`http://localhost:8080/api/users/${id}`, payload, {headers})
        alert('informações alteradas com sucesso')
      } catch(err) {
        alert(err.response.data.error)
      }
    }

    const changePassword = async () => {
      try {
        await axios.patch(`http://localhost:8080/api/users/${id}/update-password`, {password}, {headers})
        alert('Senha modificada com sucesso')
        setVisibility('true')
      } catch(err) {
        alert(err.response.data.error)
      }
    }

    const showPasswordField = () => {
      setVisibility('false')
    }

    const deleteAccount = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`, {headers})
        history.push('/register')
      } catch(err) {
        alert(err.response.data.error)
      }
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
                <form action="" className="user__form" onSubmit={handleUser}>
                    <label htmlFor="username" className="form__label">Usuário:</label>
                    <input type="text" className="form__input" value={username} onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="email" className="form__label">Email:</label>
                    <input type="email" className="form__input" value={email} onChange={e => setEmail(e.target.value)} />
                    { type === 'teacher' 
                         ? (
                        <>
                            <label htmlFor="type" className="form__label">Área</label>
                            <input type="text" className="form__input" value={area} onChange={e => setArea(e.target.value)} />
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
                      <button type="button" className="form__btn" onClick={deleteAccount}>Excluir conta</button>
                    </div>
                </form>
            </div>
          </Container >  
        </main>  
        </>
    )
}
