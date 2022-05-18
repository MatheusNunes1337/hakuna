import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

import {FaSave} from 'react-icons/fa'
import { MdAddAPhoto } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import settings from '../../assets/images/config.png'
import WarningModal from '../../components/WarningModal'
import SucessModal from '../../components/SucessModal'
import ErrorModal from '../../components/ErrorModal'

export default function UserConfig() {
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [type, setType] = useState('teacher')
    let [area, setArea] = useState('')
    let [hidePassField, setVisibility] = useState('true')
    let [profilePic, setProfilePic] = useState('')
    let [endImg] = useState('')
    let [isImageSave, setImageStatus] = useState(false)
    const [showSavePicButton, setSavePicButtonStatus] = useState(false)
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showSucessModal, setSucessModalStatus] = useState(false)
    let [showWarningModal, setWarningModalStatus] = useState(false)
    let [isOperationConfirmed, setConfirmOperation] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const history = useHistory()
    const id =  localStorage.getItem('userId')
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
      const getUser = async () => {
        try {
          const {data} = await api.get(`users/${id}`, {headers})
          const {username, email, type, area, profilePic} = data
          console.log(data)
          setUsername(username)
          setEmail(email)
          setType(type)
          setArea(area)
          setProfilePic(`https://hakuna-1337.s3.amazonaws.com/${profilePic}`)
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }
      }

      getUser()
    }, [isImageSave])

    const handleUser = async (e) => {
      e.preventDefault()

      try {
        const payload =  {username, email, type, area}
        await api.patch(`users/${id}`, payload, {headers})
        handleSucessModal('informações atualizadas com sucesso')
      } catch(err) {
          if(!Array.isArray(err.response.data))
            handleErrorModal(err.response.data.name)
          else 
            handleErrorModal(err.response.data[0].name)
      }
    }

    const changePassword = async () => {
      try {
        await api.patch(`users/${id}`, {password}, {headers})
        handleSucessModal('Senha modificada com sucesso')
        setVisibility('true')
      } catch(err) {
          if(!Array.isArray(err.response.data))
            handleErrorModal(err.response.data.name)
          else 
            handleErrorModal(err.response.data[0].name)
      }
    }

    const showPasswordField = () => {
      if(hidePassField === 'true') {
        setVisibility('false')
      } else {
        setVisibility('true')
      }
    }

    const deleteAccount = async () => {
      try {
        handleWarningModal('Você tem certeza que deseja excluir permanentemente a sua conta?')
        if(isOperationConfirmed) {
          await api.delete(`users/${id}`, {headers})
          history.push('/register')
        }
      } catch(err) {
          handleErrorModal(err.response.data.name)
      }
    }

    const changeUserPic = (e) => {
      setProfilePic(e.target.files[0])
      setSavePicButtonStatus(true)
    }

    const savePic = async () => {
      const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}
      const formData = new FormData()
      formData.append('profilePic', profilePic)

      try {
        await api.patch(`users/${id}`, formData, {headers})
        setSavePicButtonStatus(false)
        setImageStatus(true)
        handleSucessModal('Imagem de perfil atualizada com sucesso.')
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }

    const closeModal = () => {
      setErrorModalStatus(false)
      setSucessModalStatus(false)
      setWarningModalStatus(false)
      setConfirmOperation(false)
    }

    const confirmOperation = () => {
      setConfirmOperation(true)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setErrorModalStatus(true)
    }

    const handleSucessModal = (message) => {
        setModalMessage(message)
        setSucessModalStatus(true)
    }

    const handleWarningModal = (message) => {
      setModalMessage(message)
      setWarningModalStatus(true)
    }

    return (
        <>
        <NavBar />
        <main>
          <Container>
            <SearchBar />
            <Aside />
            <div className="content">
                <div className='content__title__wrapper'>
                  <img src={settings} className='title__icon' />
                  <h2 className="content__title">Configurações da conta</h2>
                </div>
                <form action="" className="user__form" onSubmit={handleUser}>
                <picture className='form__user__pic__wrapper'>
                  <input type="file" id="add_pic__btn" name='profilePic' onChange={changeUserPic} />
                  <label for="add_pic__btn" className="profile__pic__overlay"><MdAddAPhoto className='form__user__pic__icon' /></label>
                  {
                    showSavePicButton ? (<img src={URL.createObjectURL(profilePic)} alt="foto de perfil" className="user__form__pic"/>) : (
                    <img src={profilePic} className="user__form__pic"/>
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
                            {password && password.length >= 6 ? <button title='salvar senha' type="button" className="password__btn" onClick={changePassword}><FaSave className="form__icon"/></button> : ''}
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
            {
                showWarningModal ? (
                <>
                    <WarningModal closeModal={closeModal} cancelOperation={closeModal} confirmOperation={confirmOperation} message={modalMessage} />
                    <div className='overlay'></div>
                </>
                ) : ''
            }
          </Container >  
        </main>  
        </>
    )
}
