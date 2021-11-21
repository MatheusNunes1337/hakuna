import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

function GroupInfo() {
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [topics, setTopics] = useState([])
    let [is_public, setType] = useState('false')
    let [password, setPassword] = useState('')

    const { id } = useParams()
    const history = useHistory()
    const userToken = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${userToken}` }

    useEffect(() => {
      const getGroup = async() => {
        try {
          const {data} = await axios.get(`http://localhost:8080/api/groups/${id}`,  {headers})
          const {name, description, topics, is_public } = data
          setName(name)
          setDescription(description)
          setTopics(topics)
          setType(is_public.toString())
        } catch(err) {
          alert(err.response.data.error)
        }
      }
      getGroup()
    }, [])

    const handleGroup = async (e) => {
      e.preventDefault()

      try {
          const payload = {id, password}
          await axios.post('http://localhost:8080/api/members/', payload, {headers})
          history.push(`/group/${id}`)
        } catch(err) {
          alert(err.response.data.error)
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
                    <img src="https://www.freeiconspng.com/uploads/whatsapp-icon-png-4.png" alt="card-image" className="header__image" />
                    <h2 className="header__title">{name}</h2>
               </header>
               <p className="group__description">
                   {description}
               </p>
               {  topics.map(topic => {
                      return (<span className="group__topic">#{topic}</span>)
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