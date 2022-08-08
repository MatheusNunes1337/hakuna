import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import api from '../../services/api'

import {BsGithub, BsLinkedin, BsInstagram, BsFacebook} from 'react-icons/bs'
import { IoIosArrowUp } from "react-icons/io";
import {GrMail} from 'react-icons/gr'

import IndexNavBar from '../../components/IndexNavBar'
import heroImage from '../../assets/images/people_studying2.png'
import groupIcon from '../../assets/images/group.png'
import rankingIcon from '../../assets/images/crown.png'
import booksIcon from '../../assets/images/book.png'
import teacherIcon from '../../assets/images/teacher.png'
import chatIcon from '../../assets/images/chat.png'
import postIcon from '../../assets/images/post.png'
import pointIcon from '../../assets/images/point.png'
import helpIcon from '../../assets/images/help.png'


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
                        <h1 className='hero__title'>Hakuna, uma plataforma para criação de grupos de estudo</h1>
                        <p className='hero__paragraph'>Crie ou faça parte de diversos grupos de estudo e alavanque o seu conhecimento junto a outros usuários.</p>
                        <button><AnchorLink href='#functionalities__title'>Saiba mais</AnchorLink></button>
                        <button onClick={goToLoginPage}>Login</button>
                    </div>
                    <img src={heroImage} alt="girl studying" className='hero__image' />
                </section>
                <section className='functionalities'>
                    <p id="functionalities__title">O Hakuna te oferece uma gama de funcionalidades que irão auxiliar nos seus estudos.</p>
                    <div className='functionality__cards'>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={groupIcon} alt='group' />
                            <h2 className='functionality__card__title'>Grupos de estudo</h2>
                            <p className='functionality__card__message'>
                            Criação e participação em grupos de estudo baseados em uma área e tópicos de estudo.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={postIcon} alt='group' />
                            <h2 className='functionality__card__title'>Criação de postagens</h2>
                            <p className='functionality__card__message'>
                            Compartilhamento do conhecimento ou sanar dúvidas por meio da criação de postagens.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={booksIcon} alt='group' />
                            <h2 className='functionality__card__title'>Materiais de estudo</h2>
                            <p className='functionality__card__message'>
                            Download e upload de materiais de estudo para auxiliar no estudo dos estudantes.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={rankingIcon} alt='group' />
                            <h2 className='functionality__card__title'>Ranking</h2>
                            <p className='functionality__card__message'>
                            Ranqueamento dos usuários que possuirem a maior quantidade de pontos de contribuição.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={teacherIcon} alt='group' />
                            <h2 className='functionality__card__title'>Professores especializados</h2>
                            <p className='functionality__card__message'>
                            Presença de professores especializados em determinada área para auxiliar nos estudos diários de diversos grupos pertencentes a sua área de atuação.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={chatIcon} alt='group' />
                            <h2 className='functionality__card__title'>Bate-papo privado</h2>
                            <p className='functionality__card__message'>
                            Bate-papo privado entre usuários para uma maior privacidade na hora de debater tópicos de estudo.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={helpIcon} alt='group' />
                            <h2 className='functionality__card__title'>Solicitação de ajuda</h2>
                            <p className='functionality__card__message'>
                            Possui dúvida sobre determinado assunto? Não tem problema, você pode saná-la a ajuda de professores especializados na área.
                            </p>
                        </div>
                        <div className='functionality__card'>
                            <img className='functionality__card__icon' src={pointIcon} alt='group' />
                            <h2 className='functionality__card__title'>Pontos de contribuição</h2>
                            <p className='functionality__card__message'>
                            Ganhe pontos de contribuição recebendo curtidas em postagens e comentários. Em caso de descurtidas, eles serão diminuídos
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