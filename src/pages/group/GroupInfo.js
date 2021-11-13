import React, { useState } from 'react'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'

function GroupInfo() {
    let [is_public, setType] = useState('false')
    let [password, setPassword] = useState('')

    const handleGroup = async (e) => {
        e.preventDefault()

        console.log('Entrou no grupo com sucesso')
    }

    return (
      <>
        <NavBar />
        <main>
          <Container>
            <Aside />
            <div className="content">
               <header className="group__header">
                    <img src="https://www.freeiconspng.com/uploads/whatsapp-icon-png-4.png" alt="card-image" className="header__image" />
                    <h2 className="header__title">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
               </header>
               <p className="group__description">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem reiciendis mollitia debitis optio molestiae necessitatibus deleniti id accusamus ad natus dolorem exercitationem quis magnam perferendis unde, voluptate itaque qui vitae?
               </p>
               <span className="group__topic">#Lorem</span>
               <span className="group__topic">#Lorem insum</span>
               <span className="group__topic">#Geometria</span>
               <span className="group__topic">#Trigonometria</span>
               <span className="group__topic">#Funções</span>
               <form action="" className="enter__group__form" onSubmit={handleGroup}>
               {  is_public === 'false'
                         ? (
                        <>
                            <label htmlFor="password" className="form__label">Senha de acesso:</label>
                            <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                        </>    
                        ) 
                        : ''
                    }
                    <button className="form__btn">Entrar</button>
               </form>
            </div>
          </Container >  
        </main>  
      </>  
    )
}

export default GroupInfo