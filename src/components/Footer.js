import React from 'react'
import { Link } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import {BsGithub, BsLinkedin, BsInstagram, BsFacebook} from 'react-icons/bs'
import { IoIosArrowUp } from "react-icons/io";
import {GrMail} from 'react-icons/gr'

import freepikIcon from '../assets/images/freepik.png'
import flaticonIcon from '../assets/images/flaticon.png'
import reactIcon from '../assets/images/react.png'

function Footer() {
 
    return (
      <>
        <footer className='footer'>
            <section className='footer__header'>
                <div className='footer__about'>
                    <h2>Sobre</h2>
                    <p>O Hakuna é uma plataforma de criação de grupos de estudo que tem como objetivo proporcionar aos estudantes um ambiente que os possibilitará de estudar conteúdos sobre determinada área de estudo por meio da criação de postagens, comentários e compartilhamento de materiais de estudo.</p>
                    <h2>Suporte</h2>
                    <div className='footer__support'>
                        <Link to='/'><GrMail /></Link>
                        <span>suporte.hakuna2022@gmail.com</span>
                    </div>
                </div>
                <div className='footer__attributions'>
                    <h2>Icones e imagens</h2>
                    <p>Todos os icones e imagens utilizados na plataforma foram obtidos no Flaticon, Freepik e React icons.</p>
                    <div className='footer__icons'>
                        <Link to={{pathname:'https://www.freepik.com/'}} className='footer__icon' target='_blank'><img src={freepikIcon} alt='freepik' className='freepik__icon' /></Link>
                        <Link to={{pathname:'https://www.flaticon.com/'}} className='footer__icon__flaticon' target='_blank'><img src={flaticonIcon} alt='flaticon' className='flaticon__icon' /></Link>
                        <Link to={{pathname:'https://react-icons.github.io/react-icons/'}} className='footer__icon' target='_blank'><img src={reactIcon} alt='freepik' className='react__icon' /></Link>
                    </div>
                </div>
                <div className='footer__medias'>
                    <h2>Redes sociais</h2>
                    <div className='footer__social__medias'>
                    <Link to={{pathname:'https://github.com/MatheusNunes1337'}} target='_blank'><BsGithub /></Link>
                    <Link to={{pathname:'https://www.linkedin.com/in/matheus-nunes-3585a6188/'}} target='_blank'><BsLinkedin /></Link>
                    <Link to={{pathname:'https://www.instagram.com/_matheusnunesz/'}} target='_blank'><BsInstagram /></Link>
                    <Link to={{pathname:'https://www.facebook.com/matheus.nunes.547389'}} target='_blank'><BsFacebook /></Link>
                    </div>
                </div>
            </section>
            <section className='footer__footer'>
                <p className='footer__copyright'>Copyright &copy; 2022 Hakuna | Todos os direitos reservados</p>
                <div className='footer__social__medias'>
                    <Link to={{pathname:'https://github.com/MatheusNunes1337'}} target='_blank'><BsGithub /></Link>
                    <Link to={{pathname:'https://www.linkedin.com/in/matheus-nunes-3585a6188/'}} target='_blank'><BsLinkedin /></Link>
                    <Link to={{pathname:'https://www.instagram.com/_matheusnunesz/'}} target='_blank'><BsInstagram /></Link>
                    <Link to={{pathname:'https://www.facebook.com/matheus.nunes.547389'}} target='_blank'><BsFacebook /></Link>
                </div>
                <button><AnchorLink href='#index__nav'><IoIosArrowUp /></AnchorLink></button>
            </section>
        </footer>   
      </> 
    )
}

export default Footer