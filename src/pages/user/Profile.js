import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import api from '../../services/api'

import { MdBuild } from "react-icons/md";
import {FaUserAlt} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'

import profile from '../../assets/images/user.png'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import Card from '../../components/Card';

export default function Profile() {
    let [profileId, setProfileId] = useState('')
    let [username, setUsername] = useState('')
    let [type, setType] = useState('')
    let [area, setArea] = useState('')
    let [contributionPoints, setPoints] = useState(0)
    let [profilePic, setProfilePic] = useState('')
    let [groupsInCommon, setGroups] = useState([])

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

      const getGroupsInCommon = async () => {
        try {
          const {data} = await api.get(`groups?members=${id}`, {headers})
          const {groups} = data
          setGroups(groups)
        } catch(err) {
          alert(err.response.data.name)
        }
      }

      getUser()
      getGroupsInCommon()
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
                <img src={profile} className='title__icon' />
                <h2 className="content__title">{userId == id ? 'Meu perfil' : 'Perfil'}</h2>
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
                <h3 className='groups__in__common__title'>Grupos em comum</h3>
                <div className='user__groups__container'>
                {
                  groupsInCommon.length !== 0 ? 
                  groupsInCommon.map((group, index) => {
                    return (
                    <Card key={index} 
                    id={group._id} 
                    title={group.name} 
                    icon={group.discipline}
                    members={group.members.length} 
                    max_members={group.maxMembers}
                    is_public={group.isPublic}
                    cardType="search"
                    />)
                  }) : (
                    <>
                      <HiUserGroup className='any__group__icon'/>
                      <span>Parece que você ainda não participa de nenhum grupo em comum com {username}</span>
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
