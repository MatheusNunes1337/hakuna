import React from 'react'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'

function Home() {
    return (
      <>
        <NavBar />
        <main>
          <Container>
            <Aside />
            <div className="content">
                <h2 className="content__title">Página inicial</h2>
                <div className="card__wrapper">
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                </div>
            </div>
          </Container >  
        </main>  
      </>  
    )
}

export default Home