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

export default function Membros() {
    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    const [paginationIndex, setPaginationIndex] = useState(1)
    const [mods, setMods] = useState([])
    const [members, setMembers] = useState([])

    useEffect(() => {
        const getMembers = async () => {
          try {
            const {data} = await api.get(`groups/${id}`, {headers})
            const {mods, members} = data
            if(mods.includes(userId)) {
                members.filter(member => member._id !== userId)
            }
            setMods(mods)
            setMembers(members)
          } catch(err) {
            const {name} = err.response.data[0]
            alert(name)
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

    const deleteMember = () => {
        const confirmed = window.confirm('Tem certeza que deseja deletar esse membro?')
        if(!confirmed) {
            return false
        } 
    }

    const makeMod = (event) => {
        const id = event.target.value
        const confirmed = window.confirm('Tem certeza que deseja tornar esse membro moderador do grupo?')
        if(!confirmed) {
            return false
        } 
    }

    const revokeMod = (event) => {
        const id = event.target.value
        const confirmed = window.confirm('Tem certeza que deseja retirar os privilégios de moderador desse membro?')
        if(!confirmed) {
            return false
        } 
    }

    const goToProfile = (event) => {
        const id = event.target.value
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
                        <h2 className="content__title">Membros</h2>
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
                                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='member__img'/>
                                                <span className='member__name'>{member.username}</span>
                                                {
                                                    member._id == userId ? (
                                                        <div className='member__action__btns'>
                                                            <button className='member__action__btn' title='Ver perfil' value={member._id} onClick={goToProfile}><FaSearch /></button>
                                                            <button className='member__action__btn' title='Tornar moderador' value={member._id}><FaArrowUp /></button>
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
