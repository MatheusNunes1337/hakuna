import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

import { FaSearch, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import {MdOutlineArrowBack} from 'react-icons/md'
import {HiUserGroup} from 'react-icons/hi'

import group from '../../assets/images/group.png'
import ErrorModal from '../../components/ErrorModal'
import SucessModal from '../../components/SucessModal'
import WarningModal from '../../components/WarningModal'
import ProfileModal from '../../components/ProfileModal'

export default function Membros() {
    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    const [modPaginationIndex, setModPaginationIndex] = useState(1)
    const [memberPaginationIndex, setMemberPaginationIndex] = useState(1)
    const [mods, setMods] = useState([])
    const [allMods, setAllMods] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [isMod, setMod] = useState(false)
    const [members, setMembers] = useState([])
    const [totalModsPages, setTotalModsPages] = useState(0)
    const [totalMembersPages, setTotalMembersPages] = useState(0)
    const [reloadComponents, setReloadComponents] = useState(false)
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showSucessModal, setSucessModalStatus] = useState(false)
    let [showWarningModal, setWarningModalStatus] = useState(false)
    let [isOperationConfirmed, setConfirmOperation] = useState(false)
    let [modalMessage, setModalMessage] = useState('')
    let [showProfileModal, setProfileModalStatus] = useState(false)
    let [targetUser, setTargetUser] = useState('')

    useEffect(() => {
        const getMembers = async () => {
          try {
            const {data} = await api.get(`groups/${id}`, {headers})
            const {mods, members} = data
            const moderators = mods.map(mod => mod._id)
            const membersOnly = members.filter(member => !moderators.includes(member._id))
   
            if(moderators.includes(userId)) {
                setMod(true)
            } 

            setTotalModsPages(Math.ceil(mods.length / 10))
            setAllMods(mods)
            setMods(paginate(mods, modPaginationIndex))

            setTotalMembersPages(Math.ceil(members.length / 10))
            setAllMembers(members)
            setMembers(paginate(membersOnly, memberPaginationIndex))
            
            setReloadComponents(false)
          } catch(err) {
            handleErrorModal(err.response.data[0].name)
          }
        }
        getMembers()
      }, [reloadComponents])


    const deleteMember = async (event) => {
        const memberId = event.currentTarget.value
        const isOperationConfirmed = window.confirm('Você tem certeza que deseja remover esse usuário do grupo?')
        if(isOperationConfirmed) {
            try {
                await api.delete(`groups/${id}/members/${memberId}`, { headers })
                handleSucessModal('Usuário removido com sucesso')
            } catch(err) {
                handleErrorModal(err.response.data.name)
            }
        } 
    }

    const makeMod = async (event) => {
        const memberId = event.currentTarget.value
        const isOperationConfirmed = window.confirm('Você tem certeza que deseja tornar esse membro um moderador?')
        if(isOperationConfirmed) {
            try {
                await api.patch(`groups/${id}/mods/${memberId}`, {}, { headers })
                handleSucessModal('Operação realizada com sucesso')
                setReloadComponents(true)
            } catch(err) {
                handleErrorModal(err.response.data.name)
            }
        } 
    }

    const revokeMod = async (event) => {
        const modId = event.currentTarget.value
        const isOperationConfirmed = window.confirm('Você tem certeza que deseja revogar os privilégios de moderador desse membro?')
        if(isOperationConfirmed) {
            try {
                await api.delete(`groups/${id}/mods/${modId}`, { headers })
                handleSucessModal('Operação realizada com sucesso')
                setReloadComponents(true)
            } catch(err) {
                handleErrorModal(err.response.data.name)
            }
        }  
    }

    const paginate = (array, page_number, page_size = 10) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    const nextPage = (e) => {
        const paginationTarget = e.currentTarget.value
        console.log('pagination target', paginationTarget)
        if(paginationTarget === 'mod') {
            const nextIndex = modPaginationIndex + 1
            setModPaginationIndex(modPaginationIndex + 1)
            setMods(paginate(allMods, nextIndex))
        } else {
            const nextIndex = memberPaginationIndex + 1
            setMemberPaginationIndex(memberPaginationIndex + 1)
            setMembers(paginate(allMembers, nextIndex))
        }
    }

    const previousPage = (e) => {
        const paginationTarget = e.currentTarget.value
        if(paginationTarget === 'mod') {
            const previousIndex = modPaginationIndex - 1
            setModPaginationIndex(modPaginationIndex - 1)
            setMods(paginate(allMods, previousIndex))
        } else {
            const previousIndex = memberPaginationIndex - 1
            setMemberPaginationIndex(memberPaginationIndex - 1)
            setMembers(paginate(allMembers, previousIndex))
        }
    }

    const goToProfile = (event) => {
        event.preventDefault()

        const id = event.currentTarget.value
        history.push(`/${id}`)
    }

    const closeModal = () => {
        setErrorModalStatus(false)
        setSucessModalStatus(false)
        setWarningModalStatus(false)
        setConfirmOperation(false)
      }
  
      const confirmOperation = () => {
        setConfirmOperation(true)
      }
  
      const handleErrorModal = (message) => {
          setModalMessage(message)
          setErrorModalStatus(true)
      }
  
      const handleSucessModal = (message) => {
          setModalMessage(message)
          setSucessModalStatus(true)
      }
  
      const handleWarningModal = (message) => {
        setModalMessage(message)
        setWarningModalStatus(true)
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
                            <Link to={`group/${id}`} className="group__back" title='voltar' ><MdOutlineArrowBack className="back__icon"/></Link>
                            <h2 className="content__title">Membros <img src={group} className='title__colorful__icon' /></h2>
                        </div>
                        <div className='member__container'>
                            <div className='mod__container'>
                                <h3 className="content__subtitle">Moderadores</h3>
                                {
                                    mods.map((mod, index) => {
                                        return (
                                            <div className='mod__item' key={index}>
                                                <span className='member__index'>#{index + 1}</span>
                                                <img src={`https://hakuna-1337.s3.amazonaws.com/${mod.profilePic}`} className='member__img'/>
                                                <span className='member__name'>{mod.username}</span>
                                                {
                                                    mod._id !== userId ? (
                                                        <div className='member__action__btns'>
                                                            <button className='member__action__btn' title='Ver perfil' value={mod._id} onClick={handleProfileModal}><FaSearch /></button>
                                                            {
                                                                allMods.includes(userId) ? (
                                                                    <>
                                                                        <button className='member__action__btn' title='Remover moderador' value={mod._id} onClick={revokeMod}><FaArrowDown /></button>
                                                                        <button className='member__action__btn' title='Remover membro' value={mod._id} onClick={deleteMember}><AiFillDelete /></button>
                                                                    </>
                                                                ) : ''
                                                            }
                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
                                        )
                                    }) 
                                }
                                {
                                    mods.length !== 0 && totalModsPages > 1 ? (
                                        <div className='pagination__wrapper'>
                                            <button disabled={modPaginationIndex === 1} value="mod" className='pagination__btn' onClick={previousPage}><BsChevronLeft /></button>
                                            <span className='pagination__index'>{modPaginationIndex}</span>
                                            <button className='pagination__btn' value="mod" onClick={nextPage}><BsChevronRight /></button>
                                        </div>
                                    ) : ''
                                }
                            </div>
                            <div className='others__container'>
                                <h3 className="content__subtitle">Outros membros</h3>
                                {
                                    members.length !== 0 ?
                                    members.map((member, index) => {
                                        return (
                                            <div className='others__item' key={index}>
                                                <span className='member__index'>#{index + 1}</span>
                                                <img src={`https://hakuna-1337.s3.amazonaws.com/${member.profilePic}`} className='member__img'/>
                                                <span className='member__name'>{member.username}</span>
                                                {
                                                    member._id !== userId ? (
                                                        <div className='member__action__btns'>
                                                            <button className='member__action__btn' title='Ver perfil' value={member._id} onClick={handleProfileModal}><FaSearch /></button>
                                                            {
                                                                allMods.includes(userId) ? (
                                                                    <>
                                                                        <button className='member__action__btn' title='Tornar moderador' onClick={makeMod} value={member._id}><FaArrowUp /></button>
                                                                        <button className='member__action__btn' title='Remover membro' onClick={deleteMember} value={member._id}><AiFillDelete /></button>
                                                                    </>
                                                                ) : ''
                                                            }
                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
                                        ) 
                                    }) : ''
                                }
                            </div>
                        </div>
                        {
                            members.length !== 0 && totalMembersPages > 1 ? (
                                <div className='pagination__wrapper'>
                                    <button disabled={memberPaginationIndex === 1} value="member" className='pagination__btn' onClick={previousPage}><BsChevronLeft /></button>
                                    <span className='pagination__index'>{memberPaginationIndex}</span>
                                    <button className='pagination__btn' value="member" onClick={nextPage}><BsChevronRight /></button>
                                </div>
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
                    {
                        showWarningModal ? (
                        <>
                            <WarningModal closeModal={closeModal} cancelOperation={closeModal} confirmOperation={confirmOperation} message={modalMessage} />
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
