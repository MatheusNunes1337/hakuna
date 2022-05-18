import React, {useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

import { FaBars, FaCrown } from "react-icons/fa"
import { BiMessageSquareAdd } from "react-icons/bi"
import { HiLogout } from "react-icons/hi"

import { FaUserAlt } from "react-icons/fa"
import { HiUserGroup } from "react-icons/hi";
import { BsFillChatLeftFill, BsFillGearFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";

import studentPic from '../assets/images/student.png'
import crown from '../assets/images/crown.png'
import profile from '../assets/images/user.png'
import favorite from '../assets/images/touch.png'
import chat from '../assets/images/chat.png'
import settings from '../assets/images/config.png'
import help from '../assets/images/help.png'
import addIcon from '../assets/images/add.png'
import ErrorModal from './ErrorModal'

function NavBar() {
  let [hiddenMenu, setVisibility] = useState(true)
  let [username, setUsername] = useState('')
  let [type, setType] = useState('')
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')
  const history = useHistory()

  const id =  localStorage.getItem('userId')
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await api.get(`users/${id}`, {headers})
        const {username, type} = data
        setType(type)
        setUsername(username)
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }

    getUser()
  }, [])

    const logout = () => {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userId')
      history.push('/login')
    }

    const toggleMenu = () => {
      if(hiddenMenu) {
        setVisibility(false)
      } else {
        setVisibility(true)
      }
    }

    const closeErrorModal = () => {
      setErrorModalStatus(false)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setErrorModalStatus(true)
    }

    return (
      <>
        <header>
          <nav className="navbar">
              <Link to="/home" className="navbar__brand">Hakuna</Link>
              <span className='hakuna__version'>Beta</span>
              <FaBars onClick={toggleMenu} className="navbar__bars"/>
              <ul className="navbar__menu">
                  <li className="navbar__links"><Link to="/create-group" className="navbar__link"><BiMessageSquareAdd className="navbar__link__icon"/>Grupo</Link></li>
                  <li className="navbar__links"><Link to="/ranking" className="navbar__link"><FaCrown className="navbar__link__icon" />Ranking</Link></li>
                  <button className="navbar__btn"><HiLogout className="navbar__btn__icon" onClick={logout}/>Sair</button>
              </ul> 
          </nav>
          {!hiddenMenu
            ? (
          <>
            <div className="hidden__menu">
              <picture>
                <img src={studentPic} alt="user_pic" className="hidden__menu__user" />
              </picture>
              <span className="hidden__menu__username">{username}</span>
              <ul className="user__menu">
                <li className="user__links"><Link to="/create-group" className="user__link"><img src={addIcon} className="user__link__icon"/>Novo grupo</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><img src={crown} className="user__link__icon"/>Ranking</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><img src={profile} className="user__link__icon"/>Perfil</Link></li>
                <li className="user__links"><Link to="/favorite-groups" className="user__link"><img src={favorite} className="user__link__icon"/>Grupos favoritos</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><img src={chat} className="user__link__icon"/>Conversas</Link></li>
                {type == 'teacher'? <li className="sidebar__links"><Link to="/home" className="sidebar__link"><img src={help} className="user__link__icon"/>Solicitações de ajuda</Link></li> : ''}
                <li className="user__links"><Link to="/user/config" className="user__link"><img src={settings} className="user__link__icon"/>Configurações</Link></li>
                <button className="user__menu__btn"><HiLogout className="user__menu__btn__icon" onClick={logout}/>Sair</button>
              </ul>
            </div>
          </>    
          ) 
          : ''
          }
          {
            showErrorModal ? (
            <>
                <ErrorModal closeModal={closeErrorModal} message={modalMessage} />
                <div className='overlay'></div>
            </>
            ) : ''
          }
        </header>   
      </> 
    )
}

export default NavBar