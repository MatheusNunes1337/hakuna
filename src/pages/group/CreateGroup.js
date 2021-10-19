import React from 'react'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'

function CreateGroup() {
    return (
      <>
        <NavBar />
        <main>
          <Container>
            <Aside />
            <div className="content">
                <h2 className="content__title">Novo grupo</h2>
                
            </div>
          </Container >  
        </main>  
      </>  
    )
}

export default CreateGroup