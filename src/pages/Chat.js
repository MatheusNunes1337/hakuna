import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../services/api'

import { BsFillChatFill, BsThreeDots } from "react-icons/bs";
import {IoSend} from 'react-icons/io5'
import {RiChatDeleteFill} from 'react-icons/ri'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import SearchBar from '../components/SearchBar'

export default function Chat() {
    let [messages, setMessages] = useState([])
    let [showChatMenu, setChatMenu] = useState(false)

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    /*
    useEffect(() => {
        const getUsers = async () => {
          try {
            const {data} = await api.get(`users?username=${filter}`, {headers})
            const {users} = data
            setUsers(users)
          } catch(err) {
            console.log(err.response)
            alert(err.response.data[0].name)
          }
        }
    
        getUsers()
      }, [])
    */

    const handleChatMenu = () => {
        if(showChatMenu) {
            setChatMenu(false)
        } else {
          setChatMenu(true)
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
                        <div className='content__title__wrapper' style={{display: 'flex', justifyContent: 'space-between', position: 'relative'}}> 
                          <h2 className="content__title"><BsFillChatFill />JuliaRiter25</h2>
                          <BsThreeDots className='chat__options__icon' onClick={handleChatMenu}/>
                          {
                            showChatMenu ? (
                              <ul className='chat__options__menu'>
                                <li className="delete__chat"><RiChatDeleteFill className='post__options__menu__icon' />Deletar</li>
                              </ul>
                            ) : ''
                          }
                        </div>
                        <div className={messages.length !== 0 ? "messages__container" : "messages__container any__chat"}>
                            {
                              messages.length !== 0 ? (
                                <>
                                  <Link className='chat__item'>
                                      <img src={`https://hakuna-1337.s3.amazonaws.com/user.png`} alt='user image' className='chat__user__img'/>
                                      <div className='chat__message__wrapper'>
                                        <span className='chat__username'>JuliaRiter25</span>
                                        <span className='chat__last__message'>Tu sabe que independente do que tu selecionar na hora da prova, vai acabar que tu irá acertar tudo</span>
                                      </div>
                                      <span className='chat__last__message__time'>19:47</span>
                                  </Link>
                                </>
                                ) : (
                                    <>
                                        <BsFillChatFill className="any__user__icon"/>
                                        <span>Parece que você ainda não trocou mensagens com JuliaRiter25</span>
                                    </>
                                ) 
                            }
                            <div className='chat__message__send__wrapper'>
                                <input type="text" className='chat__input' placeholder='Digite a sua mensagem aqui'/>
                                <IoSend className='send__message__icon'/>
                            </div>
                        </div>
                    </div>
                </Container >  
            </main>
        </>
    )
}
