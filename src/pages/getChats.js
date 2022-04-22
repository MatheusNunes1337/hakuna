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
                        <div className={chats.length !== 0 ? "users__container" : "users__container any__user"}>
                            {
                              chats.length > 0 ?
                                (<p>em desenvolvimento</p>) : (
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
