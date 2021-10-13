import React from 'react'
import { Link } from 'react-router-dom'

import { FaBars, FaCrown } from "react-icons/fa"
import { BiMessageSquareAdd } from "react-icons/bi"
import { HiLogout } from "react-icons/hi"



import Container from './Container'

function NavBar() {

    return (
      <>
      <header>
          <Container>
              <nav className="navbar">
                  <Link to="/home" className="navbar__brand">Hakuna</Link>
                  <FaBars color="#000" className="navbar__bars"/>
                  <ul className="navbar__menu">
                      <li className="navbar__links"><Link to="/home" className="navbar__link"><BiMessageSquareAdd />Grupo</Link></li>
                      <li className="navbar__links"><Link to="/home" className="navbar__link"><FaCrown />Ranking</Link></li>
                      <button className="navbar__btn"><HiLogout />Sair</button>
                  </ul>
              </nav>
          </Container>
      </header>
      </> 
    )
}

export default NavBar