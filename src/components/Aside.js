import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

import { FaUserAlt } from "react-icons/fa"
import { HiUserGroup } from "react-icons/hi";
import { BsFillChatLeftFill, BsFillGearFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";

import studentPic from '../assets/images/student.png'

function Aside() {
  let [username, setUsername] = useState('')
  let [profilePic, setProfilePic] = useState('')
  let [type, setType] = useState('')

  const id =  localStorage.getItem('userId')
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await api.get(`users/${id}`, {headers})
        const {username, type, profilePic} = data
        setUsername(username)
        setProfilePic(`https://hakuna-1337.s3.amazonaws.com/${profilePic}`)
        setType(type)
      } catch(err) {
        alert(err.response.data.name)
      }
    }

    getUser()
  }, [])

  return (
    <aside className="aside">
        <picture>
          <img src={profilePic} className="sidebar__user" />
        </picture>
        <span className="sidebar__username">{username}</span>
        <ul className="sidebar__menu">
          <li className="sidebar__links"><Link to={`/${username}`} className="sidebar__link"><FaUserAlt className="sidebar__link__icon"/>Perfil</Link></li>
          <li className="sidebar__links"><Link to="/home" className="sidebar__link"><HiUserGroup className="sidebar__link__icon"/>Grupos</Link></li>
          <li className="sidebar__links"><Link to="/home" className="sidebar__link"><BsFillChatLeftFill className="sidebar__link__icon"/>Conversas</Link></li>
          <li className="sidebar__links"><Link to="/home" className="sidebar__link"><IoNotifications className="sidebar__link__icon"/>Notificações</Link></li>
          <li className="sidebar__links"><Link to="/user/config" className="sidebar__link"><BsFillGearFill className="sidebar__link__icon"/>Configurações</Link></li>
        </ul>
    </aside> 
  )
}

export default Aside