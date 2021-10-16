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
                <h2 className="content__title">Página inicial</h2>
            </div>
          </Container >  
        </main>  
      </>  
    )
}

export default Home