import React from 'react'
import { Link } from 'react-router-dom'

import Container from './Container'

function NavBar() {

    function oi() {
        alert('oi')
    }

    return (
      <>
      <header>
          <Container>
              <nav className="navbar">
                  <Link to="/home" className="navbar__brand">Hakuna</Link>
              </nav>
          </Container>
      </header>
      </> 
    )
}

export default NavBar