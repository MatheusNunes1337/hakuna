import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

import { FaUserAlt, FaHandsHelping } from "react-icons/fa"
import { HiUserGroup } from "react-icons/hi";
import { BsFillChatLeftFill, BsFillGearFill, BsFillChatFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";

import studentPic from '../assets/images/student.png'
import profile from '../assets/images/user.png'
import favorite from '../assets/images/touch.png'
import chat from '../assets/images/chat.png'
import settings from '../assets/images/config.png'
import help from '../assets/images/help.png'
import addIcon from '../assets/images/add.png'
import ErrorModal from './ErrorModal';

function Aside({updatePic}) {
  let [username, setUsername] = useState('')
  let [profilePic, setProfilePic] = useState('')
  let [type, setType] = useState('')
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')

  const id =  localStorage.getItem('userId')
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await api.get(`users/${id}`, {headers})
        const {username, type, profilePic, contributionPoints} = data
        setUsername(username)
        setProfilePic(`https://hakuna-1337.s3.amazonaws.com/${profilePic}`)
        setType(type)
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }

    getUser()
  }, [updatePic])

  const closeErrorModal = () => {
    setErrorModalStatus(false)
  }

  const handleErrorModal = (message) => {
      setModalMessage(message)
      setErrorModalStatus(true)
  }

  return (
    <aside className="aside">
        <picture>
          <img src={profilePic} className="sidebar__user" style={type === 'teacher' ? {borderColor: 'lightgreen'} : {borderColor: '#3799CE'}} />
        </picture>
        <span className="sidebar__username">{username}</span>
        <ul className="sidebar__menu">
          <li className="sidebar__links"><Link to="/create-group" className="sidebar__link"><img src={addIcon} className="sidebar__link__icon"/>Novo grupo</Link></li>
          <li className="sidebar__links"><Link to="/favorite-groups" className="sidebar__link"><img src={favorite} className="sidebar__link__icon"/>Grupos favoritos</Link></li>
          <li className="sidebar__links"><Link to="/chats" className="sidebar__link"><img src={chat} className="sidebar__link__icon"/>Conversas</Link></li>
          {type == 'teacher'? <li className="sidebar__links"><Link to="/help-requests" className="sidebar__link"><img src={help} className="sidebar__link__icon"/>Solicitações de ajuda</Link></li> : ''}
          <li className="sidebar__links"><Link to="/user/config" className="sidebar__link"><img src={settings} className="sidebar__link__icon"/>Configurações</Link></li>
        </ul>
        {
            showErrorModal ? (
            <>
                <ErrorModal closeModal={closeErrorModal} message={modalMessage} />
                <div className='overlay'></div>
            </>
            ) : ''
        }
    </aside> 
  )
}

export default Aside