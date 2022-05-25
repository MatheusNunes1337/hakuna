import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {IoClose} from 'react-icons/io5'

import api from '../services/api'

import cPoints from '../assets/images/point.png'

function ProfileModal({targetId, closeModal}) {
    let [profileId, setProfileId] = useState('')
    let [username, setUsername] = useState('')
    let [type, setType] = useState('')
    let [area, setArea] = useState('')
    let [contributionPoints, setPoints] = useState(0)
    let [profilePic, setProfilePic] = useState('')

    const id =  localStorage.getItem('userId')
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }

    const history = useHistory()

    useEffect(() => {
        const getUser = async () => {
          try {
            const {data} = await api.get(`users/${targetId}`, {headers})
            const { _id, username, type, area, contributionPoints, profilePic} = data
            setProfileId(_id)
            setUsername(username)
            setType(type)
            setArea(area)
            setProfilePic(`https://hakuna-1337.s3.amazonaws.com/${profilePic}`)
            setPoints(contributionPoints)
          } catch(err) {
            alert(err.response.data.name)
          }
        }
        getUser()
    }, [targetId])

    const createChat = async () => {
      try {
        const {data} = await api.post(`chats/${profileId}`, {}, {headers})
        const {_id} = data
        history.push(`/chats/${_id}`)
      } catch(err) {
        alert(err.response.data.name)
      }
    }
    
    const goToConfig = () => {
      history.push('/user/config')
    }


  return (
    <>
      <div className='profile__modal'>
            <div className='profile__modal__background'></div>
            <IoClose onClick={closeModal} className='close__profile__modal' />
            <div className='profile__modal__header'>
                <img src={profilePic} />
            </div>
            <div className='profile__modal__user__info'>
                <span>{username}</span>
                {type === 'teacher' ? <span>Professor de {area}</span> : '' }
                <div className='profile__modal__points'>
                    <img src={cPoints} alt='pontos de contribuição' />
                    <span>{contributionPoints}</span>
                </div>
            </div>
            {targetId !== id ? <button onClick={createChat}>Enviar mensagem</button> : <button onClick={goToConfig}>Configurações</button>}
        </div>  
    </> 
  )
}

export default ProfileModal