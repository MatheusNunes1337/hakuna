import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import api from '../../services/api'

import {HiUser} from 'react-icons/hi'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

import userIcon from '../../assets/images/user.png'
import cPoints from '../../assets/images/point.png'

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import ErrorModal from '../../components/ErrorModal'
import ProfileModal from '../../components/ProfileModal'

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function GetUsers() {
    let [users, setUsers] = useState([])
    let [targetUser, setTargetUser] = useState('')
    const [paginationIndex, setPaginationIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [offset, setOffset] = useState(0)
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')
    let [showProfileModal, setProfileModalStatus] = useState(false)
    let [contentLoaded, setContentLoaded] = useState(false)

    let query = useQuery();

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()
    const filter = query.get("query")

    useEffect(() => {
        const getTotalPages = async () => {
          try {
            const {data} = await api.get(`users?username=${filter}&offset=${offset}`, {headers})
            const {users} = data
            setUsers(users)
            setContentLoaded(true)
            setTotalPages(Math.ceil(users.length / 10))
          } catch(err) {
            handleErrorModal(err.response.data[0].name)
          }
        }
    
        getTotalPages()
      }, [])

    useEffect(() => {
        const getUsers = async () => {
          try {
            const {data} = await api.get(`users?username=${filter}&offset=${offset}&limit=${10}`, {headers})
            const {users} = data
            setUsers(users)
            setContentLoaded(true)
          } catch(err) {
            handleErrorModal(err.response.data[0].name)
          }
        }
    
        getUsers()
      }, [filter, paginationIndex])

    const nextPage = () => {
        setPaginationIndex(paginationIndex + 1)
        setOffset(offset + 10)
    }

    const previousPage = () => {
        setPaginationIndex(paginationIndex - 1)
        setOffset(offset - 10)
    }

    const closeErrorModal = () => {
        setErrorModalStatus(false)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setErrorModalStatus(true)
    }

    const handleProfileModal = (e) => {
        const targetId = e.currentTarget.value
        setTargetUser(targetId)
        setProfileModalStatus(true)
    }

    const closeProfileModal = () => {
        setProfileModalStatus(false)
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
                          <h2 className="content__title">Resultados para: {filter}</h2>
                        </div>
                        <div className={users.length !== 0 && contentLoaded ? "users__container" : "users__container any__user"}>
                            {
                              users.length > 0 ?
                                users.map((user, index)  => {
                                    return (
                                        <button className='user__item' value={user._id} onClick={handleProfileModal} key={index}>
                                            <img src={`https://hakuna-1337.s3.amazonaws.com/${user.profilePic}`} className='user__img'/>
                                            <span className='user__name'>{user.username}</span>
                                            <div className='user__points'>
                                                <img src={cPoints} alt='pontos de contribuição' />
                                                <span>{user.contributionPoints}</span>
                                            </div>
                                        </button>
                                    )
                                }) : (
                                    !contentLoaded ? <div className="loader"></div> : 
                                    <>
                                        <img src={userIcon} className="any__user__icon"/>
                                        <span>{`Nenhum usuário com o nome de "${filter}" foi encontrado`}</span>
                                    </>
                                ) 
                            }
                        </div>
                        {
                            users.length > 0 && totalPages > 1 ?  (
                                <div className='pagination__wrapper'>
                                    <button disabled={paginationIndex === 1} className='pagination__btn' onClick={previousPage}><BsChevronLeft /></button>
                                    <span className='pagination__index'>{paginationIndex}</span>
                                    <button disabled={paginationIndex === totalPages} className='pagination__btn' onClick={nextPage}><BsChevronRight /></button>
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
                    {
                     showProfileModal ? (
                        <>
                            <ProfileModal closeModal={closeProfileModal} targetId={targetUser} />
                            <div className='overlay'></div>
                        </>
                        ) : ''
                    }
                </Container >  
            </main>
        </>
    )
}
