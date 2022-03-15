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

    const makeMod = () => {
        const confirmed = window.confirm('Tem certeza que deseja tornar esse membro moderador do grupo?')
        if(!confirmed) {
            return false
        } 
    }

    const revokeMod = () => {
        const confirmed = window.confirm('Tem certeza que deseja retirar os privilégios de moderador desse membro?')
        if(!confirmed) {
            return false
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
                        <h2 className="content__title">Membros</h2>
                        <div className='member__container'>
                            <div className='mod__container'>
                                <h3 className="content__subtitle">Moderadores</h3>
                                <div className='mod__item'>
                                    <span className='member__index'>#1</span>
                                    <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='member__img'/>
                                    <span className='member__name'>Matheus1337</span>
                                    <div className='member__action__btns'>
                                        <button className='member__action__btn' title='Ver perfil'><FaSearch /></button>
                                        <button className='member__action__btn' title='Remover moderador' onClick={revokeMod}><FaArrowDown /></button>
                                        <button className='member__action__btn' title='Remover membro' onClick={deleteMember}><AiFillDelete /></button>
                                    </div>
                                </div>
                                <div className='mod__item'>
                                    <span className='member__index'>#2</span>
                                    <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='member__img'/>
                                    <span className='member__name'>Matheus1337</span>
                                    <div className='member__action__btns'>
                                        <button className='member__action__btn'><FaSearch /></button>
                                        <button className='member__action__btn'><FaArrowDown /></button>
                                        <button className='member__action__btn'><AiFillDelete /></button>
                                    </div>
                                </div>
                            </div>
                            <div className='others__container'>
                                <h3 className="content__subtitle">Outros membros</h3>
                                <div className='others__item'>
                                    <span className='member__index'>#1</span>
                                    <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='member__img'/>
                                    <span className='member__name'>Matheus1337</span>
                                    <div className='member__action__btns'>
                                        <button className='member__action__btn' title='Ver perfil'><FaSearch /></button>
                                        <button className='member__action__btn' title='Tornar moderador'><FaArrowUp /></button>
                                        <button className='member__action__btn' title='Remover membro'><AiFillDelete /></button>
                                    </div>
                                </div>
                                <div className='others__item'>
                                    <span className='member__index'>#2</span>
                                    <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='member__img'/>
                                    <span className='member__name'>Matheus1337</span>
                                    <div className='member__action__btns'>
                                        <button className='member__action__btn'><FaSearch /></button>
                                        <button className='member__action__btn'><FaArrowUp /></button>
                                        <button className='member__action__btn'><AiFillDelete /></button>
                                    </div>
                                </div>
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
