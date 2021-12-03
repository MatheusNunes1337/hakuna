import React, {useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import { FaBars, FaCrown } from "react-icons/fa"
import { BiMessageSquareAdd } from "react-icons/bi"
import { HiLogout } from "react-icons/hi"

import { FaUserAlt } from "react-icons/fa"
import { HiUserGroup } from "react-icons/hi";
import { BsFillChatLeftFill, BsFillGearFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";

function NavBar() {
  let [hiddenMenu, setVisibility] = useState(true)
  let [username, setUsername] = useState('')
  const history = useHistory()

  const id =  localStorage.getItem('userId')
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await axios.get(`http://localhost:8080/api/users/${id}`, {headers})
        const {username} = data
        setUsername(username)
      } catch(err) {
        alert(err.response.data.error)
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

    return (
      <>
        <header>
          <nav className="navbar">
              <Link to="/home" className="navbar__brand">Hakuna</Link>
              <FaBars onClick={toggleMenu} className="navbar__bars"/>
              <ul className="navbar__menu">
                  <li className="navbar__links"><Link to="/create-group" className="navbar__link"><BiMessageSquareAdd className="navbar__link__icon"/>Grupo</Link></li>
                  <li className="navbar__links"><Link to="/home" className="navbar__link"><FaCrown className="navbar__link__icon" />Ranking</Link></li>
                  <button className="navbar__btn"><HiLogout className="navbar__btn__icon" onClick={logout}/>Sair</button>
              </ul> 
          </nav>
          {!hiddenMenu
            ? (
          <>
            <div className="hidden__menu">
              <picture>
                <img src="data:image/jpeg;base64,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" alt="user_pic" className="hidden__menu__user" />
              </picture>
              <span className="hidden__menu__username">{username}</span>
              <ul className="user__menu">
                <li className="user__links"><Link to="/create-group" className="user__link"><BiMessageSquareAdd className="user__link__icon"/>Grupo</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><FaCrown className="user__link__icon" />Ranking</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><FaUserAlt className="user__link__icon"/>Perfil</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><HiUserGroup className="user__link__icon"/>Grupos</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><BsFillChatLeftFill className="user__link__icon"/>Conversas</Link></li>
                <li className="user__links"><Link to="/home" className="user__link"><IoNotifications className="user__link__icon"/>Notificações</Link></li>
                <li className="user__links"><Link to="/user/config" className="user__link"><BsFillGearFill className="user__link__icon"/>Configurações</Link></li>
                <button className="user__menu__btn"><HiLogout className="user__menu__btn__icon" onClick={logout}/>Sair</button>
              </ul>
            </div>
          </>    
          ) 
          : ''
          }
        </header>   
      </> 
    )
}

export default NavBar