import React, {useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

import { FaBars } from "react-icons/fa"

function IndexNavBar() {
  let [hiddenMenu, setVisibility] = useState(true)
  const history = useHistory()

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
          <nav className="index__navbar">
              <Link to="/" className="index__navbar__brand">Hakuna</Link>
              <span className='hakuna__version'>Beta</span>
              <FaBars onClick={toggleMenu} className="index__navbar__bars"/>
              <ul className="index__navbar__menu">
                  <li className="index__navbar__links"><Link to="/create-group" className="index__navbar__link">Sobre</Link></li>
                  <li className="index__navbar__links"><Link to="/ranking" className="index__navbar__link">Contato</Link></li>
                  <li className="index__navbar__links"><Link to="/ranking" className="index__navbar__link">Lorem</Link></li>
                  <li className="index__navbar__links"><Link to="/ranking" className="index__navbar__link">Ipsum</Link></li>
              </ul> 
          </nav>
        </header>   
      </> 
    )
}

export default IndexNavBar