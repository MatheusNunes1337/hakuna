import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import api from '../../services/api'

import { MdBuild } from "react-icons/md";
import {FaUserAlt} from 'react-icons/fa'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

export default function Profile() {
    let [profileId, setProfileId] = useState('')
    let [username, setUsername] = useState('')
    let [type, setType] = useState('')
    let [area, setArea] = useState('')
    let [contributionPoints, setPoints] = useState(0)
    let [profilePic, setProfilePic] = useState('')

    const history = useHistory()
    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId =  localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
      const getUser = async () => {
        try {
          const {data} = await api.get(`users/${id}`, {headers})
          console.log('data', data)
          const { _id, username, type, area, contributionPoints, profilePic} = data
          setUsername(username)
          setType(type)
          setArea(area)
          setPoints(contributionPoints)
          setProfilePic(`https://hakuna-1337.s3.amazonaws.com/${profilePic}`)
          setProfileId(_id)
        } catch(err) {
          alert(err.response.data.name)
        }
      }

      getUser()
    }, [id])

    const createChat = async (e) => {
      try {
        const targetId = e.currentTarget.value
        const {data} = await api.post(`chats/${targetId}`, {}, {headers})
        const {_id} = data
        history.push(`/chats/${_id}`)
      } catch(err) {
        alert(err.response.data.name)
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
              <div className='content__title__wrapper'>
                  <h2 className="content__title"><FaUserAlt />{userId == id ? 'Meu perfil' : 'Perfil'}</h2>
              </div>
                <div className='user__info__container'>
                    <img src={profilePic} className="user__profile__pic" />
                    <div className='profile__info__container'>
                        <span className='user__profile__username'>{username}</span>
                        {
                            type === 'teacher' ? (
                                <span className='user__profile__area'>Professor de {area}</span>
                            ) : ''  
                        }
                        <span className='user__profile__points'>{contributionPoints}</span>
                        <div className='action__btns__wrapper'>
                            <button>adicionar contato</button>
                            <button value={profileId} onClick={createChat}>enviar mensagem</button>
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
