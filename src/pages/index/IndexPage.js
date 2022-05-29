import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import api from '../../services/api'

import {BsGithub, BsLinkedin, BsInstagram, BsFacebook} from 'react-icons/bs'
import { IoIosArrowUp } from "react-icons/io";
import {GrMail} from 'react-icons/gr'

import IndexNavBar from '../../components/IndexNavBar'
import heroImage from '../../assets/images/people_studying.png'
import groupIcon from '../../assets/images/group.png'
import rankingIcon from '../../assets/images/crown.png'
import booksIcon from '../../assets/images/book.png'
import teacherIcon from '../../assets/images/teacher.png'
import chatIcon from '../../assets/images/chat.png'
import postIcon from '../../assets/images/post.png'
import pointIcon from '../../assets/images/point.png'


import '../../assets/css/styles.css'
import Container from '../../components/Container'
import Footer from '../../components/Footer'


function IndexPage() {
    const history = useHistory()

    const goToLoginPage = () => {
        history.push('/login')
    }

    return (
        <>
            <IndexNavBar />
            <main className='index__main'>
                <section className='hero'>
                    <div className='hero__content'>
                        <h1 className='hero__title'>Lorem ipsum dolor sit amet elit, consectetur adipiscing.</h1>
                        <p className='hero__paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dapibus ipsum, eu finibus metus. Proin a volutpat turpis. Etiam facilisis tincidunt cursus. Nullam a.</p>
                        <button><AnchorLink href='#functionalities__title'>Saiba mais</AnchorLink></button>
                        <button onClick={goToLoginPage}>Login</button>
                    </div>
                    <img src={heroImage} alt="girl studying" className='hero__image' />
                </section>
                <section className='functionalities'>
                    <p id="functionalities__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dapibus ipsum, eu finibus metus.</p>
                    <div className='functionality__cards'>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={groupIcon} alt='group' />
                            <h2 className='functionality__card__title'>Criação de grupos de estudo</h2>
                            <p className='functionality__card__message'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus nec justo mattis ultricies. Morbi enim erat, viverra.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={postIcon} alt='group' />
                            <h2 className='functionality__card__title'>Criação de postagens</h2>
                            <p className='functionality__card__message'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus nec justo mattis ultricies. Morbi enim erat, viverra.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={booksIcon} alt='group' />
                            <h2 className='functionality__card__title'>Compartilhamento de materiais</h2>
                            <p className='functionality__card__message'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus nec justo mattis ultricies. Morbi enim erat, viverra.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={rankingIcon} alt='group' />
                            <h2 className='functionality__card__title'>Ranking</h2>
                            <p className='functionality__card__message'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus nec justo mattis ultricies. Morbi enim erat, viverra.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={teacherIcon} alt='group' />
                            <h2 className='functionality__card__title'>Professores especializados</h2>
                            <p className='functionality__card__message'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus nec justo mattis ultricies. Morbi enim erat, viverra.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={chatIcon} alt='group' />
                            <h2 className='functionality__card__title'>Bate-papo privado</h2>
                            <p className='functionality__card__message'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus nec justo mattis ultricies. Morbi enim erat, viverra.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={pointIcon} alt='group' />
                            <h2 className='functionality__card__title'>Pontos de contribuição</h2>
                            <p className='functionality__card__message'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet purus nec justo mattis ultricies. Morbi enim erat, viverra.
                            </p>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}

export default IndexPage