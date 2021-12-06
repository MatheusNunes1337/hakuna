import React, {useState, useEffect} from 'react'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'

function Home() {
  let [groups, setGroups] = useState([])
  
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const getGroups = async () => {
      try {
        const {data} = await api.get(`groups/user`, {headers})
        setGroups(data)
      } catch(err) {
        alert(err.response.data.error)
      }
    }

    getGroups()
  }, [])
  return (
    <>
      <NavBar />
      <main>
        <Container>
          <SearchBar />
          <Aside />
          <div className="content">
            <h2 className="content__title">Página inicial</h2>
            <div className="card__wrapper">
            {
              groups.map((group, index) => {
                return (
                <Card key={index} 
                id={group.id} 
                title={group.name} 
                icon={group.discipline} 
                max_members={group.max_members}
                is_public={group.is_public}
                />)
              })
            }
            </div>
          </div>
        </Container >  
      </main>  
    </>  
  )
}


export default Home