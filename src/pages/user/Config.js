import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import {FaSave} from 'react-icons/fa'
import { MdAddAPhoto } from "react-icons/md";

import studentPic from '../../assets/images/student.png'

export default function UserConfig() {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [type, setType] = useState('teacher')
    let [area, setArea] = useState('')
    let [hidePassField, setVisibility] = useState('true')
    let [profilePic, setProfilePic] = useState('')
    let [endImg] = useState(studentPic)
    const [showSavePicButton, setSavePicButtonStatus] = useState(false)

    const history = useHistory()
    const id =  localStorage.getItem('userId')
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
      const getUser = async () => {
        try {
          console.log('TOKEN', token)
          console.log('id', id)
          const {data} = await api.get(`users/${id}`, {headers})
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
        await api.put(`users/${id}`, payload, {headers})
        alert('informações alteradas com sucesso')
      } catch(err) {
        alert(err.response.data.error)
      }
    }

    const changePassword = async () => {
      try {
        await api.patch(`users/${id}/update-password`, {password}, {headers})
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
        await api.delete(`users/${id}`, {headers})
        history.push('/register')
      } catch(err) {
        alert(err.response.data.error)
      }
    }

    const changeUserPic = (e) => {
      setProfilePic(e.target.files[0])
      setSavePicButtonStatus(true)
    }

    const savePic = () => {
      alert('imagem salva com sucesso')
      setSavePicButtonStatus(false)
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
                <picture className='form__user__pic__wrapper'>
                  <input type="file" id="add_pic__btn" name='profilePic' onChange={changeUserPic} />
                  <label for="add_pic__btn" className="overlay"><MdAddAPhoto className='form__user__pic__icon' /></label>
                  {
                    profilePic ? (<img src={URL.createObjectURL(profilePic)} alt="foto de perfil" className="user__form__pic"/>) : (
                    <img src={endImg} className="user__form__pic"/>
                    )
                  }
                </picture>
                    {showSavePicButton ? (<button type='button' onClick={savePic} className='form__user__save__pic'>salvar</button>): ''}
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
