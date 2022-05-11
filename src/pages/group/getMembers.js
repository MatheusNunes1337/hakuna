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
import { Alert } from 'bootstrap'
import {HiUserGroup} from 'react-icons/hi'

import group from '../../assets/images/group.png'

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

    useEffect(() => {
        const getMembers = async () => {
          try {
            console.log('oi')
            const {data} = await api.get(`groups/${id}`, {headers})
            const {mods, members} = data
            const moderators = mods.map(mod => mod._id)
            if(moderators.includes(userId)) {
                setMod(true)
                const membersOnly = members.filter(member => !moderators.includes(member._id))
                setTotalMembersPages(Math.ceil(membersOnly.length / 10))
                setAllMembers(membersOnly)
                setMembers(paginate(membersOnly, memberPaginationIndex))
            } else {
                setTotalMembersPages(Math.ceil(members.length / 10))
                setAllMembers(members)
                setMembers(paginate(members, memberPaginationIndex))
            }
            setTotalModsPages(Math.ceil(mods.length / 10))
            setAllMods(mods)
            setMods(paginate(mods, modPaginationIndex))
            setReloadComponents(false)
          } catch(err) {
            //const {name} = err.response.data[0]
            alert(err.response.data[0].name)
          }
        }
        getMembers()
      }, [reloadComponents])


    const deleteMember = async (event) => {
        const memberId = event.currentTarget.value
        const confirmed = window.confirm('Are you sure you want to remove this member from the group?')
        if(confirmed) {
            try {
                await api.delete(`groups/${id}/members/${memberId}`, { headers })
                Alert('Member removed successfully')
            } catch(err) {
                alert(err.response.data.name)
            }
        } 
    }

    const makeMod = async (event) => {
        const memberId = event.currentTarget.value
        const confirmed = window.confirm('Are you sure you want to make this member a moderator?')
        if(confirmed) {
            try {
                await api.patch(`groups/${id}/mods/${memberId}`, {}, { headers })
                alert('Operação realizada com sucesso')
                setReloadComponents(true)
            } catch(err) {
                alert(err.response.data.name)
            }
        } 
    }

    const revokeMod = async (event) => {
        const modId = event.currentTarget.value
        const confirmed = window.confirm('Are you sure you want to revoke moderator privileges from this member?')
        if(confirmed) {
            try {
                await api.delete(`groups/${id}/mods/${modId}`, { headers })
                alert('Operação realizada com sucesso')
                setReloadComponents(true)
            } catch(err) {
                alert(err.response.data.name)
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
                                                            <button className='member__action__btn' title='Ver perfil' value={mod._id} onClick={goToProfile}><FaSearch /></button>
                                                            <button className='member__action__btn' title='Remover moderador' value={mod._id} onClick={revokeMod}><FaArrowDown /></button>
                                                            <button className='member__action__btn' title='Remover membro' value={mod._id} onClick={deleteMember}><AiFillDelete /></button>
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
                                                            <button className='member__action__btn' title='Ver perfil' value={member._id} onClick={goToProfile}><FaSearch /></button>
                                                            <button className='member__action__btn' title='Tornar moderador' onClick={makeMod} value={member._id}><FaArrowUp /></button>
                                                            <button className='member__action__btn' title='Remover membro' onClick={deleteMember} value={member._id}><AiFillDelete /></button>
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
                </Container >  
            </main>
        </>
    )
}
