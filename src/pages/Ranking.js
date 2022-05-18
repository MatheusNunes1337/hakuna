import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../services/api'

import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Aside from '../components/Aside'
import SearchBar from '../components/SearchBar'

import goldMedal from '../assets/images/gold_medal.png'
import silverMedal from '../assets/images/silver_medal.png'
import bronzeMedal from '../assets/images/bronze_medal.png'
import ErrorModal from '../components/ErrorModal'

export default function Ranking() {
    let [users, setUsers] = useState([])
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    useEffect(() => {
        const getUsers = async () => {
          try {
            const {data} = await api.get(`ranking`, {headers})
            const {users} = data
            setUsers(users)
          } catch(err) {
            handleErrorModal(err.response.data.name)
          }
        }
    
        getUsers()
    }, [])

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
                          <h2 className="content__title">Ranking</h2>
                        </div>
                        <div className='ranking__container'>
                            {
                              users.map((user, index)  => {
                                  return (
                                    <div className='ranking__item'>
                                        <span className='ranking__user__placement'>#{index + 1}</span>
                                        <img src={`https://hakuna-1337.s3.amazonaws.com/${user.profilePic}`} className='ranking__user__img'/>
                                        <span className='ranking__user__name'>{user.username}</span>
                                        {
                                            index + 1 === 1 ? <img src={goldMedal} className='ranking__user__medal'/> : ''
                                        }
                                        {
                                          index + 1 === 2 ? <img src={silverMedal} className='ranking__user__medal'/> : ''  
                                        }
                                        {
                                          index + 1 === 3 ? <img src={bronzeMedal} className='ranking__user__medal'/> : ''  
                                        }
                                        <span className='ranking__user__points'>{user.contributionPoints} pontos</span>
                                    </div>
                                  )
                              })  
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
