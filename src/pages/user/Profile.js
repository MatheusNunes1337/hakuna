import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import api from '../../services/api'

import { MdBuild } from "react-icons/md";

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

import studentPic from '../../assets/images/student.png'

export default function Profile() {
    let [username, setUsername] = useState('Matheus1337')
    let [type, setType] = useState('teacher')
    let [area, setArea] = useState('matemática')
    let [points, setPoints] = useState(20765)
    let [profilePic, setProfilePic] = useState(studentPic)

    const history = useHistory()
    const id =  localStorage.getItem('userId')
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }

    /*
    useEffect(() => {
      const getUser = async () => {
        try {
          const {data} = await api.get(`users/${id}`, {headers})
          const {username, email, type, area} = data
          setUsername(username)
          setType(type)
          setArea(area)
          setProfilePic(studentPic)
        } catch(err) {
          alert(err.response.data.error)
        }
      }

      getUser()
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
                <h2 className="content__title">Perfil</h2>
                <div className='user__info__container'>
                    <img src={profilePic} className="user__profile__pic" />
                    <div className='profile__info__container'>
                        <span className='user__profile__username'>{username}</span>
                        {
                            type === 'teacher' ? (
                                <span className='user__profile__area'>Professor de {area}</span>
                            ) : ''  
                        }
                        <span className='user__profile__points'>{points}</span>
                        <div className='action__btns__wrapper'>
                            <button>adicionar contato</button>
                            <button>enviar mensagem</button>
                        </div>
                    </div>
                </div>
                <div className='user__groups__container'>
                    <MdBuild className='building__icon'/>
                    <span>Em desenvolvimento</span>
                </div>
            </div>
          </Container >  
        </main>  
        </>
    )
}
