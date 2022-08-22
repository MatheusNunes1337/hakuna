import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom'
import ReactScrollableFeed from 'react-scrollable-feed'
import api from '../services/api'

import { BsFillChatFill, BsThreeDots } from "react-icons/bs";
import {IoSend} from 'react-icons/io5'
import {RiChatDeleteFill} from 'react-icons/ri'
import {MdOutlineArrowBack} from 'react-icons/md'
import chat from '../assets/images/chat.png'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import SearchBar from '../components/SearchBar'

import io from 'socket.io-client'
import WarningModal from '../components/WarningModal';
import ErrorModal from '../components/ErrorModal';
const socket = io.connect('https://hakunah.herokuapp.com')

export default function Chat() {
    let [messageList, setMessageList] = useState([])
    let [currentMessage, setCurrentMessage] = useState('')
    let [showChatMenu, setChatMenu] = useState(false)
    let [messageTarget, setMessageTarget] = useState('')
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showWarningModal, setWarningModalStatus] = useState(false)
    let [isOperationConfirmed, setConfirmOperation] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    useEffect(() => {
        const joinChat = () => {
          socket.emit('join_chat', id)
        }
        joinChat()
    }, [])

    useEffect(() => {
      const getChatUserInfo = async () => {
        try {
          const {data} = await api.get(`chats/${id}`, {headers})
          const {participants} = data
          const target = participants.find(participant => participant._id !== userId)
          setMessageTarget(target.username)
        } catch(err) {
          handleErrorModal(err.response.data.name)
        }
      }
      getChatUserInfo()
  }, [])

    useEffect(() => {
      getMessages()
  }, [])

    const getMessages = async () => {
      try {
        const {data} = await api.get(`chats/${id}/messages`, {headers})
        setMessageList(data)
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }

    useEffect(() => {
      socket.on("receive_message", async (data) => {
        getMessages()
      });
    }, [socket]);
  
    const handleChatMenu = () => {
        if(showChatMenu) {
            setChatMenu(false)
        } else {
          setChatMenu(true)
        }
    }

    const handleMessage = (e) => {
        if(e.key === 'Enter') {
            sendMessage(e)
        }
    }

    const sendMessage = async (e) => {
      e.preventDefault()

      if(currentMessage !== '') {
        try {
          const {data} = await api.post(`chats/${id}/messages`, {message: currentMessage}, {headers})
          await socket.emit("send_message", {currentMessage, chat: id})
          const chatInput = document.getElementsByClassName('chat__input')[0]
          chatInput.value = ''
          setCurrentMessage('');
          getMessages()
        } catch(err) {
          handleErrorModal(err.response.data.name)
        }
      }
    }

    const deleteChat = async () => {
      try {
        const isOperationConfirmed = window.confirm('Você tem certeza que deseja deletar essa conversa? Todas as mensagens serão perdidas')
        if(isOperationConfirmed) {
          await api.delete(`chats/${id}`, {headers})
          history.push('/chats')
        } 
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }

    const closeModal = () => {
      setErrorModalStatus(false)
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
                        <div className='content__title__wrapper' style={{display: 'flex', justifyContent: 'space-between', position: 'relative'}}>
                          <Link to='/chats' className="group__back" title='voltar' ><MdOutlineArrowBack className="back__icon"/></Link> 
                          <h2 className="content__title">{messageTarget}</h2>
                          <BsThreeDots className='chat__options__icon' onClick={handleChatMenu}/>
                          {
                            showChatMenu ? (
                              <ul className='chat__options__menu'>
                                <li className="delete__chat" onClick={deleteChat}><RiChatDeleteFill className='post__options__menu__icon' />Deletar</li>
                              </ul>
                            ) : ''
                          }
                        </div>
                        <ScrollToBottom className={messageList.length !== 0 ? "messages__container" : "messages__container any__chat"}>
                            {
                              messageList.length !== 0 ? 
                              messageList.map((message, index) => {
                                 return (
                                  <div key={index} className={message.author._id !== userId ? "message__item you" : "message__item me"}>
                                    <span className='message__item__author'>{message.author._id !== userId ? message.author.username : 'Você'}</span>
                                    <p className='message__item__content'>{message.message}</p>
                                    <span className='message__item__creationTime'>{message.creationTime}</span>
                                  </div>
                                )
                              }) : (
                                    <>
                                        <div className='any__chat__wrapper'>
                                          <img src={chat} className="any__user__icon"/>
                                          <span>Parece que você ainda não trocou mensagens com {messageTarget}</span>
                                        </div>
                                    </>
                                ) 
                            }
                        </ScrollToBottom>
                        <div className='chat__message__send__wrapper'>
                            <input type="text" className='chat__input'
                            onKeyDown={handleMessage} 
                            onChange={e => setCurrentMessage(e.target.value)}
                            placeholder='Digite a sua mensagem aqui'/>
                            <IoSend className='send__message__icon' onClick={sendMessage}/>
                        </div>
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
