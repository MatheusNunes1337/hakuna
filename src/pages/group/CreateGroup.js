import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

import {IoMdAdd} from 'react-icons/io'
import {IoClose} from 'react-icons/io5'
import SucessModal from '../../components/SucessModal'
import ErrorModal from '../../components/ErrorModal'

function CreateGroup() {
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [discipline, setDiscipline] = useState('')
    let [topic, setTopic] = useState('')
    let [topics, setTopics] = useState([])
    let [isPublic, setType] = useState(true)
    let [password, setPassword] = useState(null)
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showSucessModal, setSucessModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const history = useHistory()
    const userToken = localStorage.getItem('userToken')

     const handleGroup = async (e) => {
        e.preventDefault()
        try {
          const groupData = {
            name, description, discipline, topics, isPublic, password
          }
          const headers = { Authorization: `Bearer ${userToken}` }
          const {data} = await api.post('groups', groupData, { headers })
          handleSucessModal('Grupo criado com sucesso')
          history.push(`/group/${data._id}`)
        } catch(err) {
            if(!Array.isArray(err.response.data))
              handleErrorModal(err.response.data.name)
            else 
              handleErrorModal(err.response.data[0].name)
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
        <NavBar />
        <main>
          <Container>
            <SearchBar />
            <Aside />
            <div className="content">
                <div className='content__title__wrapper'>
                  <h2 className="content__title">Novo grupo</h2>
                </div>
                <form action="" className="group__form" onSubmit={handleGroup}>
                    <label htmlFor="name" className="form__label">Nome:</label>
                    <input type="text" className="form__input" onChange={e => setName(e.target.value)} />
                    <label htmlFor="description" className="form__label">Descrição:</label>
                    <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" onChange={e => setDescription(e.target.value)}></textarea>
                    <label htmlFor="discipline" className="form__label">Disciplina:</label>
                    <input type="text" className="form__input" onChange={e => setDiscipline(e.target.value)} />
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
                    <label htmlFor="type" className="form__label">Tipo:</label>
                    <select name="type" className="form__select" onChange={e => setType(e.target.value)}>
                      <option value="true">público</option>
                      <option value="false">privado</option>
                    </select>
                    {  isPublic.toString() === 'false'
                         ? (
                        <>
                            <label htmlFor="password" className="form__label">Senha:</label>
                            <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                        </>    
                        ) 
                        : ''
                    }
                    <button className="form__btn">Criar</button>
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
          </Container >  
        </main>  
      </>  
    )
}

export default CreateGroup