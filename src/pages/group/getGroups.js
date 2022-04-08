import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function GetGroups() {
  let [groups, setGroups] = useState([])

  let query = useQuery();

  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }
  const filter = query.get("query")
 
  useEffect(() => {
    const getGroups = async () => {
      try {
        console.log('filter', filter)
        const {data} = await api.get(`groups?name=${filter}&topics=${filter}`, {headers})
        const {groups} = data
        setGroups(groups)
      } catch(err) {
        alert(err.response.data.name)
      }
    }

    getGroups()
  }, [filter])

  return (
    <>
      <NavBar />
      <main>
        <Container>
          <SearchBar />
          <Aside />
          <div className="content">
            <h2 className="content__title">Resultados para: {filter}</h2>
            <div className="card__wrapper">
              {
                groups.length !== 0 ? 
                groups.map((group, index) => {
                  return (
                  <Card key={index} 
                  id={group.id} 
                  title={group.name} 
                  icon={group.discipline} 
                  max_members={group.max_members}
                  is_public={group.is_public}
                  search={true}
                  />)
                }) : (
                  <p>Nenhum grupo encontrado</p>
                )
              }
            </div>
          </div>
        </Container >  
      </main>  
    </>  
  )
}


export default GetGroups