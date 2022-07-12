import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import helpIcon from '../assets/images/help.png'
import sucessIcon from '../assets/images/sucess.png'
import errorIcon from '../assets/images/error.png'
import userImage from '../assets/images/student.png'
import ErrorModal from '../components/ErrorModal'
import setGroupIcon from '../utils/setGroupIcon'
import { IoClose } from 'react-icons/io5'

function HelpRequests() {
  let [helpRequests, setHelpRequests] = useState([])
  let [request, setRequest] = useState({})
  const [paginationIndex, setPaginationIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')
  let [contentLoaded, setContentLoaded] = useState(false)
  const [reloadComponents, setReloadComponents] = useState(false)
  let [showRequestModal, setRequestModal] = useState(false)

  const token = localStorage.getItem('userToken')
  const headers = { Authorization: `Bearer ${token}` }
  const userId =  localStorage.getItem('userId')
  const history = useHistory()
 
  useEffect(() => {
    const getHelpRequests = async () => {
      try {
        const {data} = await api.get(`users/${userId}`, {headers})
        const {helpRequests, username} = data
        setHelpRequests(helpRequests.reverse())
        setReloadComponents(false)
        setContentLoaded(true)
      } catch(err) {
          handleErrorModal(err.response.data.name)
      }
    }

    getHelpRequests()
  }, [reloadComponents])

  const closeModal = () => {
    setErrorModalStatus(false)
  }

  const handleErrorModal = (message) => {
    setModalMessage(message)
    setErrorModalStatus(true)
  }

  const openRequestModal = (e) => {
    const requestId = e.currentTarget.value
    const request = helpRequests.find(request => request._id == requestId)
    setRequest(request)
    setRequestModal(true)
  }

  const closeRequestModal = () => {
    setRequestModal(false)
  }

  const declineRequest = async (e) => {
    const requestId = e.currentTarget.value
    try {
        const confirm = window.confirm('Você tem certeza que deseja recusar participar desse grupo?')
        if(!confirm) return
        await api.delete(`help-requests/${requestId}`, {headers})
        closeRequestModal()
        setReloadComponents(true)
    } catch(err) {  
        handleErrorModal(err.response.data.name)
    }
 }

 const acceptRequest = async (e) => {
  const groupId = e.currentTarget.className
  const requestId = e.currentTarget.value
  try {
      const confirm = window.confirm('Uma vez confirmado, você fará parte desse grupo e poderá ter acesso as postagens, materiais de estudo e dúvidas dos estudantes. Tem certeza que deseja continuar?')
      if(!confirm) return
      await api.patch(`groups/${groupId}/join`, {}, {headers})
      await api.delete(`help-requests/${requestId}`, {headers})
      history.push(`/group/${groupId}`)
  } catch(err) {  
      handleErrorModal(err.response.data.name)
  }
}


  /*
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
  */

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
            <div className={helpRequests.length !== 0 && contentLoaded ? 'chat__container' : 'chat__container any__chat'}>
            {
                helpRequests.length !== 0 ? 
                helpRequests.map((request, index) => {
                    return (
                        <button className='help__item' key={index} value={request._id} onClick={openRequestModal}>
                            <img src={setGroupIcon(request.group.discipline)} alt='group image' className='help__group__img'/>
                            <div className='help__item__wrapper'>
                                <span className='help__username'>{request.group.name}</span>
                                <span className='help__content'>{request.content}</span>
                            </div>
                            <span className='request__time'>{request.creationDate}</span>
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
            {
                showRequestModal ? (
                <>
                  <div className='request__modal'>
                    <IoClose onClick={closeRequestModal} className='close__request__modal' />
                    <div className='request__modal__header'>
                        <img src={helpIcon} alt='help image' className='request__modal__icon' />
                        <h2 className='request__modal__title'>{request.group.name}</h2>
                    </div>
                    <p className='request__modal__message'>
                        {request.content}
                    </p>
                    <p className='request__modal__confirm'>Você deseja fazer parte deste grupo?</p>
                    <div className='request__btns__wrapper'>
                      <button className={request.group._id} value={request._id} onClick={acceptRequest}><img src={sucessIcon} alt='sucess icon' />sim</button>
                      <button value={request._id} onClick={declineRequest}><img src={errorIcon} alt='error icon' />não</button>
                    </div>
                  </div>
                  <div className='overlay'></div>
                </>
                ) : ''
            }
           </div>
            {
                showErrorModal ? (
                <>
                    <ErrorModal closeModal={closeModal} message={modalMessage} />
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