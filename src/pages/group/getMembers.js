import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

import { FaSearch, FaArrowDown } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


export default function Membros() {
    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

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
                                        <button className='ranking__user__points'><FaSearch /></button>
                                        <button className='ranking__user__points'><FaArrowDown /></button>
                                        <button className='ranking__user__points'><AiFillDelete /></button>
                                    </div>
                                </div>
                                <div className='mod__item'>
                                    <span className='member__index'>#2</span>
                                    <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='member__img'/>
                                    <span className='member__name'>Matheus1337</span>
                                    <div className='member__action__btns'>
                                        <button className='ranking__user__points'><FaSearch /></button>
                                        <button className='ranking__user__points'><FaArrowDown /></button>
                                        <button className='ranking__user__points'><AiFillDelete /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container >  
            </main>
        </>
    )
}
