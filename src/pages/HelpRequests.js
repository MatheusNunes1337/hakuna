import React, {useState, useEffect} from 'react'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import helpIcon from '../assets/images/help.png'
import userImage from '../assets/images/student.png'
import ErrorModal from '../components/ErrorModal'

function HelpRequests() {
  let [helpRequests, setHelpRequests] = useState([])
  const [paginationIndex, setPaginationIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')
  let [contentLoaded, setContentLoaded] = useState(false)
  let [RequestHelpFilter, setRequestHelpFilter] = useState(false)

  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }
  const userId =  localStorage.getItem('userId')
 
  useEffect(() => {
    const getHelpRequests = async () => {
      try {
        setHelpRequests([{name: 'batata'}, {name: 'bolo'}])
        setContentLoaded(true)
        setTotalPages(Math.ceil(helpRequests.length / 12))
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
    }

    getHelpRequests()
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
                <img src={helpIcon} className='title__icon' />
                <h2 className="content__title">Solicitações de ajuda</h2>
            </div>
            <div className='help__filter__wrapper'>
                <select className='post__filter' defaultValue="todos" onChange={e => setRequestHelpFilter(e.target.value)}>
                    <option title='mostrar todas as postagens' value="todas">pendentes</option>
                    <option title='mostrar postagens criadas por mim' value="minhas">respondidas</option>
                    <option title='mostrar postagens criadas por mim' value="minhas">solucionadas</option>
                </select>
            </div>
            <div className={helpRequests.length !== 0 && contentLoaded ? 'chat__container' : 'chat__container any__chat'}>
            {
                helpRequests.length !== 0 ? 
                helpRequests.map((request, index) => {
                    return (
                        <button className='help__item' key={index}>
                            <img src={userImage} alt='user image' className='help__user__img'/>
                            <div className='help__item__wrapper'>
                                <span className='help__username'>Matheus1337 - Grupo do Dok2</span>
                                <span className='help__content'>Gostaria de saber qual é a raiz quadrada de 20</span>
                            </div>
                            <span className='request__time'>13:17</span>
                        </button>
                    )
                }) : (
                  
                  !contentLoaded ? <div className="loader"></div> : 
                  <>
                    <img src={helpIcon} className="any__group__icon"/>
                    <span>Parece que não foi requisitada nenhuma ajuda a você ainda</span>
                  </>
                )
              }
            </div>
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


export default HelpRequests