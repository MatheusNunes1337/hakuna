import React, {useState, useEffect} from 'react'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import favoriteIcon from '../assets/images/touch.png'
import ErrorModal from '../components/ErrorModal'

function FavoriteGroups() {
  let [groups, setGroups] = useState([])
  const [paginationIndex, setPaginationIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')

  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }
  const userId =  localStorage.getItem('userId')
 
  useEffect(() => {
    const getGroups = async () => {
      try {
        const {data} = await api.get(`groups?favorites=${userId}&offset=${offset}`, {headers})
        console.log('data', data)
        const {groups} = data
        setGroups(groups)
        setTotalPages(Math.ceil(groups.length / 12))
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }

    getGroups()
  }, [paginationIndex])

  const nextPage = () => {
    setPaginationIndex(paginationIndex + 1)
    setOffset(offset + 12)
  }

  const previousPage = () => {
      setPaginationIndex(paginationIndex - 1)
      setOffset(offset - 12)
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
              <img src={favoriteIcon} className='title__icon' />
              <h2 className="content__title">Grupos favoritos</h2>
            </div>
            <div className={groups.length !== 0 ? "card__wrapper": "card__wrapper any__group"}>
              {
                groups.length !== 0 ? 
                groups.map((group, index) => {
                  return (
                  <Card key={index} 
                  id={group._id} 
                  title={group.name}
                  description={group.description}
                  topics={group.topics} 
                  icon={group.discipline}
                  members={group.members.length} 
                  max_members={group.maxMembers}
                  is_public={group.isPublic}
                  showFavoriteButton={false}
                  />)
                }) : (
                  <>
                    <img src={favoriteIcon} className="any__group__icon"/>
                    <span>Parece que você não adicionou nenhum grupo aos favoritos</span>
                  </>
                )
              }
            </div>
            {
              groups.length > 0 && totalPages > 1 ? (
                <div className='pagination__wrapper'>
                  <button disabled={paginationIndex === 1} className='pagination__btn' onClick={previousPage}><BsChevronLeft /></button>
                  <span className='pagination__index'>{paginationIndex}</span>
                  <button className='pagination__btn' onClick={nextPage}><BsChevronRight /></button>
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


export default FavoriteGroups