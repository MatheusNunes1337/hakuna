import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FaBars, FaCrown } from "react-icons/fa"
import { BiMessageSquareAdd } from "react-icons/bi"
import { HiLogout } from "react-icons/hi"

import Container from './Container'

function NavBar() {
  const history = useHistory()
    const logout = () => {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userId')
      history.push('/login')
    }

    return (
      <>
        <header>
          <nav className="navbar">
              <Link to="/home" className="navbar__brand">Hakuna</Link>
              <FaBars className="navbar__bars"/>
              <ul className="navbar__menu">
                  <li className="navbar__links"><Link to="/home" className="navbar__link"><BiMessageSquareAdd className="navbar__link__icon"/>Grupo</Link></li>
                  <li className="navbar__links"><Link to="/home" className="navbar__link"><FaCrown className="navbar__link__icon" />Ranking</Link></li>
                  <button className="navbar__btn"><HiLogout className="navbar__btn__icon" onClick={logout}/>Sair</button>
              </ul> 
          </nav>
        </header>   
      </> 
    )
}

export default NavBar