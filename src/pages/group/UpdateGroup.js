import React, { useState } from 'react'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'

function CreateGroup() {
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [discipline, setDiscipline] = useState('')
    let [topics, setTopics] = useState('')
    let [members, setMembers] = useState(0)
    let [is_public, setType] = useState('true')
    let [password, setPassword] = useState('')

     const handleGroup = async (e) => {
        e.preventDefault()

        console.log('formulário de update de grupo submetido')
        alert(is_public)
    }

    return (
      <>
        <NavBar />
        <main>
          <Container>
            <Aside />
            <div className="content">
                <h2 className="content__title">Configurações do grupo</h2>
                <form action="" className="group__form" onSubmit={handleGroup}>
                    <label htmlFor="name" className="form__label">Nome:</label>
                    <input type="text" className="form__input" onChange={e => setName(e.target.value)} />
                    <label htmlFor="description" className="form__label">Descrição:</label>
                    <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" onChange={e => setDescription(e.target.value)}></textarea>
                    <label htmlFor="discipline" className="form__label">Disciplina:</label>
                    <input type="text" className="form__input" onChange={e => setDiscipline(e.target.value)} />
                    <label htmlFor="topics" className="form__label">Tópicos (máx: 5, separados entre vírgulas):</label>
                    <input type="text" className="form__input" onChange={e => setTopics(e.target.value)} />
                    <label htmlFor="max_members" className="form__label">Número máximo de membros:</label>
                    <input type="text" className="form__input" onChange={e => setMembers(e.target.value)} />
                    <label htmlFor="type" className="form__label">Tipo:</label>
                    <select name="type" className="form__select" onChange={e => setType(e.target.value)}>
                      <option value="true">público</option>
                      <option value="false">privado</option>
                    </select>
                    {  is_public === 'false'
                         ? (
                        <>
                            <label htmlFor="password" className="form__label">Senha:</label>
                            <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                        </>    
                        ) 
                        : ''
                    }
                    <button className="form__btn">Salvar</button>
                </form>
            </div>
          </Container >  
        </main>  
      </>  
    )
}

export default CreateGroup