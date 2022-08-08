import React, {useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

import { FaBars } from "react-icons/fa"

function IndexNavBar() {
  let [hiddenMenu, setVisibility] = useState(true)

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
          <nav className="index__navbar" id='index__nav'>
              <Link to="/" className="index__navbar__brand">Hakuna</Link>
              <span className='hakuna__version'>Beta</span>
              <FaBars onClick={toggleMenu} className="index__navbar__bars"/>
              <ul className="index__navbar__menu">
              <li className="index__navbar__links"><Link to={{pathname:'https://hakunah.herokuapp.com/api/v1/api-docs'}} target='_blank' className="index__navbar__link">Documentação</Link></li>
                  <li className="index__navbar__links"><Link to={{pathname:'https://docs.google.com/document/d/14U_eKYhol5aUs1gHAjpIAQik7ijTx2P5Ekparlop_po/edit?usp=sharing'}} target='_blank' className="index__navbar__link">Sobre</Link></li>
                  <li className="index__navbar__links"><Link to="/" className="index__navbar__link">Contato</Link></li>
              </ul> 
          </nav>
          {!hiddenMenu
            ? (
          <>
            <div className="index__hidden__menu">
              <ul className="index__menu">
              <li className="index__menu__links"><Link to={{pathname:'https://hakunah.herokuapp.com/api/v1/api-docs'}} target='_blank' className="index__menu__link">Documentação</Link></li>
                  <li className="index__menu__links"><Link to={{pathname:'https://docs.google.com/document/d/14U_eKYhol5aUs1gHAjpIAQik7ijTx2P5Ekparlop_po/edit?usp=sharing'}} target='_blank' className="index__menu__link">Sobre</Link></li>
                  <li className="index__menu__links"><Link to="/" className="index__menu__link">Contato</Link></li>
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

export default IndexNavBar