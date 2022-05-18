import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

import {MdOutlineArrowBack} from 'react-icons/md'
import {BsFillGearFill} from 'react-icons/bs'
import {IoMdAdd} from 'react-icons/io'
import {IoClose} from 'react-icons/io5'
import {FaSave} from 'react-icons/fa'

import settings from '../../assets/images/settings.png'
import ErrorModal from '../../components/ErrorModal'
import SucessModal from '../../components/SucessModal'
import WarningModal from '../../components/WarningModal'

function CreateGroup() {
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [discipline, setDiscipline] = useState('')
    let [topics, setTopics] = useState([])
    let [topic, setTopic] = useState('')
    let [maxMembers, setMembers] = useState(0)
    let [isPublic, setType] = useState('')
    let [password, setPassword] = useState(null)
    const [isMod, setMod] = useState(false)
    const [showPasswordField, setShowPasswordField] = useState(false)
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showSucessModal, setSucessModalStatus] = useState(false)
    let [showWarningModal, setWarningModalStatus] = useState(false)
    let [isOperationConfirmed, setConfirmOperation] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const { id } = useParams()
    const history = useHistory()
    const userToken = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${userToken}` }

    useEffect(() => {
      const getGroup = async() => {
        try {
          const headers = { Authorization: `Bearer ${userToken}` }
          const {data} = await api.get(`groups/${id}`, { headers })
          const {name, description, discipline, topics, maxMembers, isPublic, mods } = data
          setName(name)
          setDescription(description)
          setDiscipline(discipline)
          setTopics([...topics])
          setMembers(maxMembers)
          setType(isPublic)
          const moderators = mods.map(mod => mod._id) 
          if(moderators.includes(userId)) setMod(true)
        } catch(err) {
          handleErrorModal(err.response.data.name)   
        }
      }
      getGroup()
    }, [])

     const handleGroup = async (e) => {
        e.preventDefault()
        
        try {
          const payload = {
            name, description, discipline, topics, maxMembers, isPublic, password
          }
  
          if(payload.isPublic === 'true') {
            payload.password = null
            payload.isPublic = true
          } else {
            payload.isPublic = false
          }

          await api.patch(`groups/${id}`, payload, { headers })
          handleSucessModal('informações do grupo atualizadas com sucesso')
        } catch(err) {
            if(!Array.isArray(err.response.data))
              handleErrorModal(err.response.data.name)
            else 
              handleErrorModal(err.response.data[0].name)
        }
    }

    const deleteGroup = async () => {
      try {
        handleWarningModal('Você tem certeza que deseja deletar esse grupo? Todas as postagens e materiais serão perdidos')
        if(isOperationConfirmed) {
          await api.delete(`groups/${id}`, {headers})
          history.push('/home')
        }
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }


    const addTopic = () => {
      const duplicate = topics.find(item => item === topic)
      if(duplicate) {
        alert('Topics with duplicate values are not allowed')
        return 
      }
      setTopics([...topics, topic])
      const input = document.getElementById('topic__input')
      input.value = ''
    }

    const deleteTopic = (e) => {
      const {baseVal} = e.currentTarget.className
      const [,topic] = baseVal.split(' ')
      const topicos = topics.filter(item => {
        return item !== topic
      })
      setTopics([...topicos])
    }

    const handlePasswordField = () => {
      if(showPasswordField) {
        setShowPasswordField(false)
      } else {
        setShowPasswordField(true)
      }
    }

    const changePassword = async () => {
      try {
        if(password.length < 6 || password.length > 12) {
          alert('The password must be 6 to 12 characters long')
          return
        }
        await api.patch(`groups/${id}`, {password, isPublic: false}, {headers})
        handleSucessModal('Password updated successfully')
        setShowPasswordField(false)
        setPassword(null)
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
                  <Link to={`group/${id}`} className="group__back" title='voltar' ><MdOutlineArrowBack className="back__icon"/></Link>
                  <h2 className="content__title">Configurações do grupo <img src={settings} className='title__colorful__icon' /></h2>
                </div>
                <form action="" className="group__form" onSubmit={handleGroup}>
                    <label htmlFor="name" className="form__label">Nome:</label>
                    <input type="text" className="form__input" value={name} onChange={e => setName(e.target.value)} />
                    <label htmlFor="description" className="form__label">Descrição:</label>
                    <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <label htmlFor="discipline" className="form__label">Disciplina:</label>
                    <input type="text" className="form__input" value={discipline} onChange={e => setDiscipline(e.target.value)} />
                    <label htmlFor="topics" className="form__label">Tópicos:</label>
                    <div className='topics__wrapper'>
                        <input type="text" className="form__input" id="topic__input" onChange={e => setTopic(e.target.value)} />
                        <button type='button' disabled={topics.length === 5} className='add__tag__button' onClick={addTopic}><IoMdAdd /></button>
                    </div>
                    <div className='create__group__topics__wrapper'>
                      {
                        topics.map((topic, index) => {
                          return (<span key={index} className='create__group__topic'>{topic} <IoClose onClick={deleteTopic} className={`delete__topic__icon ${topic}`} /></span>)
                        })
                      }
                    </div>
                    <label htmlFor="max_members" className="form__label">Número máximo de membros:</label>
                    <input type="text" className="form__input" value={maxMembers} onChange={e => setMembers(e.target.value)} />
                    <label htmlFor="type" className="form__label">Tipo:</label>
                    <select name="type" className="form__select" value={isPublic} onChange={e => setType(e.target.value)}>
                      <option value="true">público</option>
                      <option value="false" selected="selected">privado</option>
                    </select>
                    {  showPasswordField
                         ? (
                        <>
                            <label htmlFor="password" className="form__label">Senha:</label>
                            <div className='topics__wrapper'>
                                <input type="password" className="form__input" value={password} onChange={e => setPassword(e.target.value)} />
                                {password && password.length >= 6 ? <button title='salvar senha' type='button' className='add__tag__button' onClick={changePassword}><FaSave /></button> : ''}
                            </div>
                        </>    
                        ) 
                        : ''
                    }
                     <div className="button__group">
                      <button className="form__btn">Salvar</button>
                      {isPublic.toString() === 'false' ? <button type='button' className="form__btn" onClick={handlePasswordField}>Alterar senha</button> : ''}
                      <button type="button" className="form__btn" onClick={deleteGroup}>Excluir grupo</button>
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

export default CreateGroup