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
import { AiOutlineLogout } from 'react-icons/ai'

import studentPic from '../assets/images/student.png'
import crown from '../assets/images/crown.png'
import profile from '../assets/images/user.png'
import favorite from '../assets/images/touch.png'
import chat from '../assets/images/chat.png'
import settings from '../assets/images/config.png'
import help from '../assets/images/help.png'
import addIcon from '../assets/images/add.png'
import cPoints from '../assets/images/point.png'
import ErrorModal from './ErrorModal'

function NavBar() {
  let [hiddenMenu, setVisibility] = useState(true)
  let [username, setUsername] = useState('')
  let [type, setType] = useState('')
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [contributionPoints, setCPoints] = useState('')
  let [modalMessage, setModalMessage] = useState('')
  
  const id =  localStorage.getItem('userId')
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  const history = useHistory()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await api.get(`users/${id}`, {headers})
        const {username, type, contributionPoints} = data
        setType(type)
        setUsername(username)
        setCPoints(contributionPoints)
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
                  <div className="navbar__cPoints__wrapper">
                    <img src={cPoints} alt='pontos de contribuição' title='pontos de contribuição'/>
                    <span className="navbar__cPoints">{contributionPoints}</span>
                  </div>
                  <div className="navbar__cPoints__wrapper">
                    <img src={crown} alt='ranking' title='ranking'/>
                    <Link to="/ranking" className="navbar__link">Ranking</Link>
                  </div>
                  <li className="navbar__links"></li>
                  <button className="navbar__btn" onClick={logout}><AiOutlineLogout className="navbar__btn__icon"/>Logout</button>
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
              <div className="user__cPoints__wrapper">
                <img src={cPoints} alt='pontos de contribuição' title='pontos de contribuição'/>
                <span className="user__cPoints">{contributionPoints}</span>
              </div>
              <ul className="user__menu">
                <li className="user__links"><Link to="/create-group" className="user__link"><img src={addIcon} className="user__link__icon"/>Novo grupo</Link></li>
                <li className="user__links"><Link to="/ranking" className="user__link"><img src={crown} className="user__link__icon"/>Ranking</Link></li>
                <li className="user__links"><Link to="/favorite-groups" className="user__link"><img src={favorite} className="user__link__icon"/>Grupos favoritos</Link></li>
                <li className="user__links"><Link to="/chats" className="user__link"><img src={chat} className="user__link__icon"/>Conversas</Link></li>
                {type == 'teacher'? <li className="sidebar__links"><Link to="/help-requests" className="sidebar__link"><img src={help} className="user__link__icon"/>Solicitações de ajuda</Link></li> : ''}
                <li className="user__links"><Link to="/user/config" className="user__link"><img src={settings} className="user__link__icon"/>Configurações</Link></li>
                <button className="user__menu__btn" onClick={logout}><AiOutlineLogout className="user__menu__btn__icon"/>Logout</button>
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