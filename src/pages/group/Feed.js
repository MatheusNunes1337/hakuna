import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

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
    const [isMod, setMod] = useState(false)

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    useEffect(() => {
        const getMods = async () => {
          try {
            const {data} = await api.get(`members/group/${id}/mods`, {headers})
            data.map(mod => {
                if(mod.id == userId)
                    setMod(true)
            })
          } catch(err) {
            alert(err.response.data.error)
          }
        }
        getMods()
      }, [])

    const handlePost = () => {
        console.log('post criado com sucesso')
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
                    <h2 className="content__title">Feed</h2>
                    <div className="group__options">
                        <Link to="/home" className="group__options__link"><HiUsers className="group__options__icon"/>Membros</Link>
                        <Link to="/home" className="group__options__link"><FaBook className="group__options__icon"/>Materiais</Link>
                        <Link to="/home" className="group__options__link"><BsFillCameraVideoFill className="group__options__icon"/>Videochamadas</Link>
                        {!isMod ? '' : <Link to={`/group/${id}/config`} className="group__options__link"><BsFillGearFill className="group__options__icon"/>Configurações</Link>}
                        <button className="group__options__btn" onClick={quitGroup}><HiLogout className="group__options__icon"/>Sair</button>
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
