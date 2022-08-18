import React, {useState, useEffect} from 'react'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'

import sunny from '../assets/images/sunny.png'
import moon from '../assets/images/moon.png'
import groupIcon from '../assets/images/group.png'
import homeIcon from '../assets/images/home.png'


import { BsChevronRight, BsChevronLeft, BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { FaSadCry } from "react-icons/fa";
import getCurrentHour from '../utils/getCurrentHour'
import ErrorModal from '../components/ErrorModal'

function Home() {
  let [groups, setGroups] = useState([])
  let [username, setUsername] = useState('')
  let [greeting, setGreeting] = useState('')
  let [greetingIcon, setGreetingIcon] = useState('')
  const [groupPaginationIndex, setGroupPaginationIndex] = useState(1)
  const [allGroups, setAllGroups] = useState([])
  const [totalGroupPages, setTotalGroupPages] = useState(0)
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')
  let [contentLoaded, setContentLoaded] = useState(false)
  
  const id =  localStorage.getItem('userId')
  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const getGroups = async () => {
      try {
        const {data} = await api.get(`users/${id}`, {headers})
        const {groups, username} = data
        setTotalGroupPages(Math.ceil(groups.length / 12))
        setAllGroups(groups)
        setGroups(paginate(groups, groupPaginationIndex))
        setUsername(username)
        setContentLoaded(true)

        const currentHour = getCurrentHour()

        if(currentHour > 4 && currentHour < 12) {
          setGreeting(`Bom dia, ${username}`)
          setGreetingIcon(<img src={sunny} className="title__icon" />)
        } else if(currentHour > 12 && currentHour < 18) {
          setGreeting(`Boa tarde, ${username}`)
          setGreetingIcon(<img src={sunny} className="title__icon" />)
        } else if(currentHour > 18 || currentHour < 4) {
          setGreeting(`Boa noite, ${username}`)
          setGreetingIcon(<img src={moon} className="title__icon" />)
        }
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }
    getGroups()
  }, [])

  const paginate = (array, page_number, page_size = 12) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  } 

    const nextPage = (e) => {
      const nextIndex = groupPaginationIndex + 1
      setGroupPaginationIndex(groupPaginationIndex + 1)
      setGroups(paginate(allGroups, nextIndex))
    }

    const previousPage = (e) => {
      const previousIndex = groupPaginationIndex - 1
      setGroupPaginationIndex(groupPaginationIndex - 1)
      setGroups(paginate(allGroups, previousIndex))
        
    }

  const closeErrorModal = () => {
    setErrorModalStatus(false)
  }

  const handleErrorModal = (message) => {
      setModalMessage(message)
      setErrorModalStatus(true)
  }

  return (
    <>
      <NavBar />
      <main>
        <Container>
          <SearchBar />
          <Aside />
          <div className="content">
            <div className='content__title__wrapper'>
              <img src={homeIcon} className='title__icon' />
              <h2 className="content__title">Página inicial</h2>
            </div>
            <div className={groups.length !== 0 && contentLoaded ? "card__wrapper": "card__wrapper any__group"}>
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
                showFavoriteButton={true}
                />)
              }) : (
                !contentLoaded ? <div className="loader"></div> : 
                <>
                  <img src={groupIcon} className="any__group__icon"/>
                  <span>Parece que você ainda não participa de nenhum grupo</span>
                </>
              )
            }
            </div>
            {
              groups.length !== 0 && totalGroupPages > 1 ? (
                  <div className='pagination__wrapper'>
                      <button disabled={groupPaginationIndex === 1}  className='pagination__btn' onClick={previousPage}><BsChevronLeft /></button>
                      <span className='pagination__index'>{groupPaginationIndex}</span>
                      <button disabled={groupPaginationIndex === totalGroupPages} className='pagination__btn' onClick={nextPage}><BsChevronRight /></button>
                  </div>
              ) : ''
            }
          </div>
          {
            showErrorModal ? (
            <>
                <ErrorModal closeModal={closeErrorModal} message={modalMessage} />
                <div className='overlay'></div>
            </>
            ) : ''
          }
        </Container >  
      </main>  
    </>  
  )
}


export default Home