import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { HiLogout, HiUsers } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill, BsThreeDots } from "react-icons/bs";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import {FaBook, FaCommentAlt} from 'react-icons/fa'
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
                        <Link to={`/group/${id}/members`} className="group__options__link"><HiUsers className="group__options__icon"/>Membros</Link>
                        <Link to="/home" className="group__options__link"><FaBook className="group__options__icon"/>Materiais</Link>
                        <Link to="/home" className="group__options__link"><BsFillCameraVideoFill className="group__options__icon"/>Videochamadas</Link>
                        {!isMod ? '' : <Link to={`/group/${id}/config`} className="group__options__link"><BsFillGearFill className="group__options__icon"/>Configurações</Link>}
                        <button className="group__options__btn" onClick={quitGroup}><HiLogout className="group__options__icon"/>Sair</button>
                    </div>
                    <form action="" className="post__form" onSubmit={handlePost}>
                        <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" placeholder='Compartilhe algo com os seus colegas'></textarea>
                        <button className="form__btn">Postar</button>
                        <input type="file" id="add_material__btn" name='files' multiple/>
                        <label for="add_material__btn" className="material__btn"><FaBook className="group__options__icon"/></label> 
                    </form>
                    <div className="group__posts">
                    {  posts.length == 0
                         ? (
                        <>
                            <div className='post__item'>
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='post__author__img'/>
                                <div className='post__infos'>
                                    <span className='post__author__name'>Matheus1337</span>
                                    <span className='post__author__title'>Professor de matemática</span>
                                    <span className='post__creation_time'>17:45</span>
                                </div>
                                <button className='post__options__btn'><BsThreeDots /></button>
                                <p className='post__content'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et ipsum vel nunc ultricies posuere nec pulvinar purus. Ut id feugiat odio. Mauris sagittis urna ut rhoncus convallis. Praesent tincidunt elementum enim, et gravida enim. Nullam vestibulum nibh in leo viverra consequat. Pellentesque vestibulum tempus auctor. Phasellus lacinia ante non scelerisque pretium. Maecenas vel quam sit amet velit vehicula pellentesque.
                                    Sed volutpat purus nec sem ullamcorper sagittis. Morbi felis mi, facilisis nec mauris at, finibus pulvinar justo. Suspendisse facilisis neque sapien, vel vehicula neque bibendum gravida. Aliquam vel luctus dui, suscipit aliquet justo. Mauris aliquam eu urna vitae mollis. In porttitor erat sit amet eleifend ullamcorper. Pellentesque ultrices lorem non justo mollis, ut ornare leo condimentum. Integer quis erat condimentum arcu tempor dignissim at in augue. Vivamus dui lectus, condimentum at ornare ornare, maximus et nibh. Phasellus venenatis imperdiet neque in faucibus. Donec semper erat vel ultrices sollicitudin. Suspendisse aliquet, ligula quis fermentum viverra, nisi nibh porta metus, a lacinia quam diam sit amet ante. Aenean rhoncus ex at finibus pretium.
                                </p>
                                <hr />
                                <div className='post__action__btns'>
                                    <button><AiFillLike />Like</button>
                                    <button><AiFillDislike />Deslike</button>
                                    <button><FaCommentAlt/>Comentar</button>
                                    <button><FaBook />Materiais</button>
                                </div>
                                <div className='post__comment__input'>
                                    <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='post__author__img'/>
                                    <input type="text" placeholder='adicionar comentário'/>
                                    <FaBook className='material__comment__icon'/>
                                </div>
                            </div>
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
