import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

function CreateGroup() {
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [discipline, setDiscipline] = useState('')
    let [topics, setTopics] = useState([])
    let [members, setMembers] = useState(0)
    let [isPublic, setType] = useState(true)
    let [password, setPassword] = useState('')

    const { id } = useParams()
    const history = useHistory()
    const userToken = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${userToken}` }

    useEffect(() => {
      const getGroup = async() => {
        try {
          const headers = { Authorization: `Bearer ${userToken}` }
          const {data} = await api.get(`groups/${id}`, { headers })
          const {name, description, discipline, topics, maxMembers, isPublic } = data
          setName(name)
          setDescription(description)
          setDiscipline(discipline)
          setTopics(topics.join(','))
          setMembers(maxMembers)
          setType(isPublic)
        } catch(err) {
          alert(err.response.data.name)
        }
      }
      getGroup()
    }, [])

     const handleGroup = async (e) => {
        e.preventDefault()
        
        try {
          const payload = {
            name, description, discipline, topics: topics.split(','), members, isPublic, password
          }
  
          if(payload.isPublic === 'true') {
            payload.password = null
            setType(true)
          } else {
            setType(false)
          }

  
          //await api.put(`groups/${id}`, payload, { headers })
          console.log('payload', payload)
          alert('informações do grupo atualizadas com sucesso')
        } catch(err) {
          alert(err.response.data.name)
        }
    }

    const deleteGroup = async () => {
      try {
        await api.delete(`groups/${id}`, {headers})
        history.push('/home')
      } catch(err) {
        alert(err.response.data.name)
      }
    }

    return (
      <>
        <NavBar />
        <main>
          <Container>
            <SearchBar />
            <Aside />
            <div className="content">
                <h2 className="content__title">Configurações do grupo</h2>
                <form action="" className="group__form" onSubmit={handleGroup}>
                    <label htmlFor="name" className="form__label">Nome:</label>
                    <input type="text" className="form__input" value={name} onChange={e => setName(e.target.value)} />
                    <label htmlFor="description" className="form__label">Descrição:</label>
                    <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <label htmlFor="discipline" className="form__label">Disciplina:</label>
                    <input type="text" className="form__input" value={discipline} onChange={e => setDiscipline(e.target.value)} />
                    <label htmlFor="topics" className="form__label">Tópicos (máx: 5, separados entre vírgulas):</label>
                    <input type="text" className="form__input" value={topics} onChange={e => setTopics(e.target.value)} />
                    <label htmlFor="max_members" className="form__label">Número máximo de membros:</label>
                    <input type="text" className="form__input" value={members} onChange={e => setMembers(e.target.value)} />
                    <label htmlFor="type" className="form__label">Tipo:</label>
                    <select name="type" className="form__select" value={isPublic} onChange={e => setType(e.target.value)}>
                      <option value="true">público</option>
                      <option value="false" selected="selected">privado</option>
                    </select>
                    {  isPublic.toString() === 'false'
                         ? (
                        <>
                            <label htmlFor="password" className="form__label">Senha:</label>
                            <input type="password" className="form__input" value={password} onChange={e => setPassword(e.target.value)} />
                        </>    
                        ) 
                        : ''
                    }
                     <div className="button__group">
                      <button className="form__btn">Salvar</button>
                      <button type="button" className="form__btn" onClick={deleteGroup}>Excluir grupo</button>
                    </div>
                </form>
            </div>
          </Container >  
        </main>  
      </>  
    )
}

export default CreateGroup