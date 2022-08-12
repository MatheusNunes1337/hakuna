import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'

import { BsChevronRight, BsChevronLeft, BsDot } from "react-icons/bs";
import helpIcon from '../assets/images/help.png'
import sucessIcon from '../assets/images/sucess.png'
import errorIcon from '../assets/images/error.png'
import userImage from '../assets/images/student.png'
import addMaterial from '../assets/images/add_material.png'
import removeIcon from '../assets/images/trash.png'
import ErrorModal from '../components/ErrorModal'
import setGroupIcon from '../utils/setGroupIcon'
import { IoClose } from 'react-icons/io5'
import badWordCatcher from '../utils/badWordCatcher'
import SucessModal from '../components/SucessModal'

function HelpRequests() {
  let [helpRequests, setHelpRequests] = useState([])
  let [request, setRequest] = useState({})
  const [paginationIndex, setPaginationIndex] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [offset, setOffset] = useState(0)
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [showSucessModal, setSucessModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')
  let [contentLoaded, setContentLoaded] = useState(false)
  const [reloadComponents, setReloadComponents] = useState(false)
  let [showRequestModal, setRequestModal] = useState(false)
  const [commentContent, setCommentContent] = useState('')
  const [commentFiles, setCommentFiles] = useState([])

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
    setSucessModalStatus(false)
  }

  const handleErrorModal = (message) => {
    setModalMessage(message)
    setRequestModal(false)
    setErrorModalStatus(true)
  }


  const handleSucessModal = (message) => {
    setModalMessage(message)
    setRequestModal(false)
    setSucessModalStatus(true)
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
    e.stopPropagation()
    const requestId = e.currentTarget.value
  
    try {
        const confirm = window.confirm('Você tem certeza que deseja recusar ajudar esse usuário?')
        if(!confirm) return
        await api.delete(`help-requests/${requestId}`, {headers})
        closeRequestModal()
        setReloadComponents(true)
    } catch(err) {  
        handleErrorModal(err.response.data.name)
    }
  }

  const createComment = async (postId) => {
    if(commentContent.length == 0) {
        handleErrorModal('The comment content cannot be null.')
        return 
        
    } else if(commentContent.length > 300) {
        handleErrorModal('The comment content must be a maximum of 300 characters.')
        return 
    } else if(Array.from(commentFiles).length > 3) {
        handleErrorModal('You can only upload a maximum of three files per comment.')
        return
    }

    const badWordsCount =  badWordCatcher(commentContent)
    if(badWordsCount > 0) {
        handleErrorModal('Não são permitidas palavras impróprias no conteúdo de um comentário.')
        return
    }

    try {
        const formData = new FormData()
        formData.append('content', commentContent)
        if(Array.from(commentFiles).length > 0) {
            Array.from(commentFiles).forEach(file => {
                formData.append('files', file)
            })
        }

        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}
        await api.post(`groups/${request.group._id}/posts/${postId}/comments`, formData, {headers})
        await api.delete(`help-requests/${postId}`, {headers: { Authorization: `Bearer ${token}` }})
        handleSucessModal('Comentário criado com sucesso. Para saber a repercussão da postagem, você deve ser um membro do grupo.')
        
        setCommentFiles([])
        setCommentContent('')
        setRequestModal(false)
        setReloadComponents(true)
    } catch(err) {
        if(!Array.isArray(err.response.data))
            handleErrorModal(err.response.data.name)
        else 
            handleErrorModal(err.response.data[0].name)
    }
  }

  const submitComment = (e) => {
    const postId = e.target.className
    if(e.key === 'Enter') {
        createComment(postId)
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
                            <img src={`https://hakuna-1337.s3.amazonaws.com/${request.author.profilePic}`} alt='group image' className='help__user__img' style={request.author.type === 'teacher' ? {border: '2px solid lightgreen'} : {border: '2px solid #3799CE'}}/>
                            <div className='help__item__wrapper'>
                                <span className='help__username'>{request.author.username} <BsDot className='point__icon' /> {request.group.name}</span>
                                <span className='help__content'>{request.content}</span>
                            </div>
                            <button value={request._id} onClick={declineRequest} title='remover solicitação de ajuda' className='request__delete'><img src={removeIcon} /></button>
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
                        <img src={`https://hakuna-1337.s3.amazonaws.com/${request.author.profilePic}`} alt='help image' className='request__modal__icon' style={request.author.type === 'teacher' ? {border: '2px solid lightgreen'} : {border: '2px solid #3799CE'}} />
                        <h2 className='request__modal__title'>{request.author.username}<BsDot />{request.group.name}</h2>
                    </div>
                    <p className='request__modal__message'>
                        {request.content}
                    </p>
                    <div className='helpRequest__comment__input'>
                      <input type="text" placeholder='adicionar comentário' className={request._id} onKeyDown={submitComment} onChange={e => setCommentContent(e.target.value)} />
                      <input type="file" id="add_material__comment__btn" onChange={e => setCommentFiles(e.target.files)}  name='files' multiple/>
                      <label for="add_material__comment__btn" className=""><img src={addMaterial} className="material__comment__icon"/></label>
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

            {
                showSucessModal ? (
                <>
                    <SucessModal closeModal={closeModal} message={modalMessage} />
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