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

export default function Ranking() {
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
                        <h2 className="content__title">Ranking</h2>
                        <div className='ranking__container'>
                            <div className='ranking__item'>
                                <span className='ranking__user__placement'>#1</span>
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='ranking__user__img'/>
                                <span className='ranking__user__name'>Matheus1337</span>
                                <img src={goldMedal} className='ranking__user__medal'/>
                                <span className='ranking__user__points'>24710 pontos</span>
                            </div>
                            <div className='ranking__item'>
                                <span className='ranking__user__placement'>#2</span>
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='ranking__user__img'/>
                                <span className='ranking__user__name'>Matheus1337</span>
                                <img src={silverMedal} className='ranking__user__medal'/>
                                <span className='ranking__user__points'>24710 pontos</span>
                            </div>
                            <div className='ranking__item'>
                                <span className='ranking__user__placement'>#3</span>
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='ranking__user__img'/>
                                <span className='ranking__user__name'>Matheus1337</span>
                                <img src={bronzeMedal} className='ranking__user__medal'/>
                                <span className='ranking__user__points'>24710 pontos</span>
                            </div>
                            <div className='ranking__item'>
                                <span className='ranking__user__placement'>#4</span>
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='ranking__user__img'/>
                                <span className='ranking__user__name'>Matheus1337</span>
                                <span className='ranking__user__points'>24710 pontos</span>
                            </div>
                            <div className='ranking__item'>
                                <span className='ranking__user__placement'>#5</span>
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='ranking__user__img'/>
                                <span className='ranking__user__name'>Matheus1337</span>
                                <span className='ranking__user__points'>24710 pontos</span>
                            </div>
                        </div>
                    </div>
                </Container >  
            </main>
        </>
    )
}
