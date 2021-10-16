import React from 'react'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'

function Home() {
    return (
      <>
        <NavBar />
        <main>
          <Container>
            <Aside />
            <div className="content">
                <p>content</p>
            </div>
          </Container >  
        </main>  
      </>  
    )
}

export default Home