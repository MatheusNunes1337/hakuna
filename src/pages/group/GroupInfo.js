import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Redirect, Link } from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import setGroupIcon from '../../utils/setGroupIcon'

function GroupInfo() {
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [topics, setTopics] = useState([])
    let [is_public, setType] = useState('false')
    let [password, setPassword] = useState(null)
    let [icon, setIcon] = useState('')

    const { id } = useParams()
    const history = useHistory()
    const userToken = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${userToken}` }

    useEffect(() => {
      const getGroup = async() => {
        try {
          const {data} = await api.get(`groups/${id}`,  {headers})
          const {name, description, discipline, topics, isPublic } = data
          setName(name)
          setDescription(description)
          setTopics(topics)
          setType(isPublic.toString())
          setIcon(setGroupIcon(discipline))
        } catch(err) {
          alert(err.response.data.name)
        }
      }
      getGroup()
    }, [])

    const handleGroup = async (e) => {
      e.preventDefault()

      try {
          const payload = {password}
          await api.patch(`groups/${id}/join`, payload, {headers})
          history.push(`/group/${id}`)
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
               <header className="group__header">
                    <img src={icon} alt="group-image" className="header__image" />
                    <h2 className="header__title">{name}</h2>
               </header>
               <p className="group__description">
                   {description}
               </p>
               {  topics.map(topic => {
                      return (<Link className="group__topic" to={`/search/groups?query=${topic}`}>#{topic}</Link>)
                  })        
               }
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