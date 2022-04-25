import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../services/api'

import { BsFillChatFill } from "react-icons/bs";

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

    return (
        <>
        <NavBar />
            <main>
                <Container>
                    <SearchBar />
                    <Aside />
                    <div className="content">
                        <div className='content__title__wrapper'> 
                          <h2 className="content__title"><BsFillChatFill />Minhas conversas</h2>
                        </div>
                        <div className={chats.length == 0 ? "chat__container" : "chat__container any__chat"}>
                            {
                              chats.length == 0 ? (
                                <>
                                  <Link className='chat__item'>
                                      <img src={`https://hakuna-1337.s3.amazonaws.com/user.png`} alt='user image' className='chat__user__img'/>
                                      <div className='chat__message__wrapper'>
                                        <span className='chat__username'>JuliaRiter25</span>
                                        <span className='chat__last__message'>Tu sabe que independente do que tu selecionar na hora da prova, vai acabar que tu irá acertar tudo</span>
                                      </div>
                                      <span className='chat__last__message__time'>19:47</span>
                                  </Link>
                                  <Link className='chat__item'>
                                      <img src={`https://hakuna-1337.s3.amazonaws.com/user.png`} alt='user image' className='chat__user__img'/>
                                      <div className='chat__message__wrapper'>
                                        <span className='chat__username'>JuliaRiter25</span>
                                        <span className='chat__last__message'>Tu sabe que independente do que tu selecionar na hora da prova, vai acabar que tu irá acertar tudo</span>
                                      </div>
                                      <span className='chat__last__message__time'>19:47</span>
                                  </Link>
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
