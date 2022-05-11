import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../services/api'

import { BsFillChatFill } from "react-icons/bs";
import chat from '../assets/images/chat.png'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import SearchBar from '../components/SearchBar'

export default function GetChats() {
    let [chats, setChats] = useState([])

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    useEffect(() => {
        const getUsers = async () => {
          try {
            const {data} = await api.get(`chats/`, {headers})
            setChats(data)
          } catch(err) {
            alert(err.response.data[0].name)
          }
        }
    
        getUsers()
      }, [])
    
    return (
        <>
        <NavBar />
            <main>
                <Container>
                    <SearchBar />
                    <Aside />
                    <div className="content">
                        <div className='content__title__wrapper'> 
                          <h2 className="content__title"><img src={chat} className='title__icon' />Minhas conversas</h2>
                        </div>
                        <div className={chats.length !== 0 ? "chat__container" : "chat__container any__chat"}>
                            {
                              chats.length !== 0 ? 
                                  chats.map((chat, key) => {
                                    return (
                                      <Link className='chat__item' to={`/chats/${chat._id}`} key={key}>
                                          <img src={`https://hakuna-1337.s3.amazonaws.com/${chat.participants.find(participant => participant._id !== userId).profilePic}`} alt='user image' className='chat__user__img'/>
                                          <div className='chat__message__wrapper'>
                                            <span className='chat__username'>{chat.participants.find(participant => participant._id !== userId).username}</span>
                                            {chat.messages.length > 0 ? <span className='chat__last__message'>{chat.messages[chat.messages.length - 1].message.author !== userId ? chat.participants.find(participant => participant._id !== userId).username : 'Você'}: {chat.messages[chat.messages.length - 1].message}</span> : <span className='any__message__yet'>Essa conversa ainda não possui nenhuma mensagem</span>}
                                          </div>
                                          {chat.messages.length > 0 ? <span className='chat__last__message__time'>{chat.messages[chat.messages.length - 1].creationTime}</span> : ''}
                                      </Link>
                                    )
                                  })
                                 : (
                                    <>
                                        <img src={chat} className="any__user__icon"/>
                                        <span>Parece que você ainda não trocou mensagens com nenhum usuário</span>
                                    </>
                                ) 
                            }
                        </div>
                    </div>
                </Container >  
            </main>
        </>
    )
}
