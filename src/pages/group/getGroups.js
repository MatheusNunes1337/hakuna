import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import api from '../../services/api'

import {HiUserGroup} from 'react-icons/hi'

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
        const {data} = await api.get(`groups?discipline=${filter}&topics=${filter}`, {headers})
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
            <div className='content__title__wrapper'>
              <h2 className="content__title">Resultados para: {filter}</h2>
            </div>
            <div className={groups.length !== 0 ? "card__wrapper": "card__wrapper any__group"}>
              {
                groups.length !== 0 ? 
                groups.map((group, index) => {
                  return (
                  <Card key={index} 
                  id={group._id} 
                  title={group.name} 
                  icon={group.discipline}
                  members={group.members.length} 
                  max_members={group.maxMembers}
                  is_public={group.isPublic}
                  search={true}
                  />)
                }) : (
                  <>
                    <HiUserGroup className="any__user__icon"/>
                    <span>{`Nenhum grupo com a disciplina ou tópico "${filter}" foi encontrado`}</span>
                  </>
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