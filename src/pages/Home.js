import React from 'react'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'

function Home() {
    return (
      <>
      <div className="wrapper">
        <NavBar />
        <main>
          <Container>
            <Aside />
            <div className="content">
                <p>content</p>
            </div>
          </Container >  
        </main>
       </div>    
      </>  
    )
}

export default Home