import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { HiLogout, HiUsers } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill } from "react-icons/bs";
import {FaBook} from 'react-icons/fa'
import { CgFeed } from "react-icons/cg";

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'

export default function Feed() {
    const [posts, setPosts] = useState([])
    const handlePost = () => {
        console.log('post criado com sucesso')
    }

    return (
        <>
        <NavBar />
            <main>
                <Container>
                <SearchBar />
                <Aside />
                <div className="content">
                    <h2 className="content__title">Feed</h2>
                    <div className="group__options">
                        <Link to="/home" className="group__options__link"><HiUsers className="group__options__icon"/>Membros</Link>
                        <Link to="/home" className="group__options__link"><FaBook className="group__options__icon"/>Materiais</Link>
                        <Link to="/home" className="group__options__link"><BsFillCameraVideoFill className="group__options__icon"/>Videochamadas</Link>
                        <Link to="/home" className="group__options__link"><BsFillGearFill className="group__options__icon"/>Configurações</Link>
                        <Link to="/home" className="group__options__link"><HiLogout className="group__options__icon"/>Sair</Link>
                    </div>
                    <form action="" className="post__form" onSubmit={handlePost}>
                        <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7">Compartilhe algo com os seus colegas</textarea>
                        <button className="form__btn">Postar</button>
                        <button className="material__btn"><FaBook className="group__options__icon"/></button>   
                    </form>
                    <div className="group__posts">
                    {  posts.length !== 0
                         ? (
                        <>
                            ''
                        </>    
                        ) 
                        : <>
                            <CgFeed className="group__feed__icon"/>
                            <p className="group__feed__message">Nenhuma publicação foi realizada ainda</p>
                          </>
                    }
                    </div>
                </div>
                </Container >  
            </main>
        </>
    )
}
