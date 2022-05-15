import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import api from '../../services/api'

import IndexNavBar from '../../components/IndexNavBar'
import heroImage from '../../assets/images/girl_studying.png'

import '../../assets/css/styles.css'
import Container from '../../components/Container'


function IndexPage() {
    return (
        <>
            <IndexNavBar />
            <main className='index__main'>
                <section className='hero'>
                    <div className='hero__content'>
                        <h1 className='hero__title'>Lorem ipsum dolor sit amet elit, consectetur adipiscing.</h1>
                        <p className='hero__paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dapibus ipsum, eu finibus metus. Proin a volutpat turpis. Etiam facilisis tincidunt cursus. Nullam a.</p>
                        <button><AnchorLink href='#functionalities__title'>Saiba mais</AnchorLink></button>
                        <button>Login</button>
                    </div>
                    <img src={heroImage} alt="girl studying" className='hero__image' />
                </section>
                <section className='functionalities'>
                    <p id="functionalities__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu dapibus ipsum, eu finibus metus.</p>
                    <div className='functionality__cards'>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                        <div className='functionality__card'>
                            <span>Lorem ipsum</span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default IndexPage