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

export default function Membros() {
    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    const [paginationIndex, setPaginationIndex] = useState(1)
    const [mods, setMods] = useState([])
    const [isMod, setMod] = useState(false)
    const [members, setMembers] = useState([])

    useEffect(() => {
        const getMembers = async () => {
          try {
            const {data} = await api.get(`groups/${id}`, {headers})
            const {mods, members} = data
            const moderators = mods.map(mod => mod._id)
            if(moderators.includes(userId)) {
                setMod(true)
                const membersOnly = members.filter(member => member._id !== userId)
                setMembers(membersOnly)
            } else {
                setMembers(members)
            }
            setMods(mods)
          } catch(err) {
            //const {name} = err.response.data[0]
            alert(err.response.data[0].name)
          }
        }
        getMembers()
      }, [])

    const nextPage = () => {
        setPaginationIndex(paginationIndex + 1)
    }

    const previousPage = () => {
        setPaginationIndex(paginationIndex - 1)
    }

    const deleteMember = async (event) => {
        const id = event.currentTarget.value
        const confirmed = window.confirm('Tem certeza que deseja deletar esse membro?')
        if(!confirmed) {
            try {
                await api.patch(`groups/${id}`, { headers })
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
                console.log(headers)
                await api.patch(`groups/${id}/mods/${memberId}`, { headers })
                alert('Operação realizada com sucesso')
            } catch(err) {
                alert(err.response.data.name)
            }
        } 
    }

    const revokeMod = (event) => {
        const id = event.currentTarget.value
        const confirmed = window.confirm('Tem certeza que deseja retirar os privilégios de moderador desse membro?')
        if(!confirmed) {
            return false
        } 
    }

    const goToProfile = (event) => {
        event.preventDefault()

        const id = event.currentTarget.value
        history.push(`/${id}`)
    }

    const quitGroup = async () => {
        try {
            await api.delete(`members/group/${id}`, {headers})
            history.push('/home')
        } catch(err) {
            alert(err.response.data.error)
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
                            <Link to={`group/${id}`} className="group__back" title='voltar' ><MdOutlineArrowBack className="back__icon"/></Link>
                            <h2 className="content__title">Membros</h2>
                        </div>
                        <div className='member__container'>
                            <div className='mod__container'>
                                <h3 className="content__subtitle">Moderadores</h3>
                                {
                                    mods.map((mod, index) => {
                                        return (
                                            <div className='mod__item'>
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
                            </div>
                            <div className='others__container'>
                                <h3 className="content__subtitle">Outros membros</h3>
                                {
                                    members.length !== 0 ?
                                    members.map((member, index) => {
                                        return (
                                            <div className='others__item'>
                                                <span className='member__index'>#{index + 1}</span>
                                                <img src={`https://hakuna-1337.s3.amazonaws.com/${member.profilePic}`} className='member__img'/>
                                                <span className='member__name'>{member.username}</span>
                                                {
                                                    member._id !== userId ? (
                                                        <div className='member__action__btns'>
                                                            <button className='member__action__btn' title='Ver perfil' value={member._id} onClick={goToProfile}><FaSearch /></button>
                                                            <button className='member__action__btn' title='Tornar moderador' onClick={makeMod} value={member._id}><FaArrowUp /></button>
                                                            <button className='member__action__btn' title='Remover membro' value={member._id}><AiFillDelete /></button>
                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
                                        ) 
                                    }) : ''
                                }
                            </div>
                        </div>
                        <div className='pagination__wrapper'>
                            <button disabled={paginationIndex === 1} className='pagination__btn' onClick={previousPage}><BsChevronLeft /></button>
                            <span className='pagination__index'>{paginationIndex}</span>
                            <button className='pagination__btn' onClick={nextPage}><BsChevronRight /></button>
                        </div>
                    </div>
                </Container >  
            </main>
        </>
    )
}
