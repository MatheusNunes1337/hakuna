import React, {useState, useEffect} from 'react'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { FaSadCry } from "react-icons/fa";

function Home() {
  let [groups, setGroups] = useState([])
  let [username, setUsername] = useState('')
  const [paginationIndex, setPaginationIndex] = useState(1)
  
  const id =  localStorage.getItem('userId')
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const getGroups = async () => {
      try {
        const {data} = await api.get(`users/${id}`, {headers})
        const {groups, username} = data
        console.log(groups)
        setGroups(groups)
        setUsername(username)
      } catch(err) {
        alert(err.response.data.name)
      }
    }
    getGroups()
  }, [])

  const nextPage = () => {
    setPaginationIndex(paginationIndex + 1)
  }

  const previousPage = () => {
      setPaginationIndex(paginationIndex - 1)
  }
  return (
    <>
      <NavBar />
      <main>
        <Container>
          <SearchBar />
          <Aside />
          <div className="content">
            <h2 className="content__title welcome">Bem vindo de volta, {username}</h2>
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
                cardType="search"
                />)
              }) : (
                <>
                  <HiUserGroup className='any__group__icon'/>
                  <span>Parece que você ainda não participa de nenhum grupo</span>
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


export default Home