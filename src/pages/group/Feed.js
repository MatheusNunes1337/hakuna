import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { HiLogout, HiUsers } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill, BsThreeDots } from "react-icons/bs";
import { AiFillDislike, AiFillLike, AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import {FaBook, FaCommentAlt} from 'react-icons/fa'
import { CgFeed } from "react-icons/cg";

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import FileButton from '../../components/FileDownloadButton';

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [isMod, setMod] = useState(false)
    const [comments, setComments] = useState(['oi', 'tchau'])
    const [showCommentInput, setCommentInput] = useState(false)
    const [showCommentList, setCommentList] = useState(false)
    const [showPostFilesList, setPostFilesList] = useState(false)
    const [showCommentFilesList, setCommentFilesList] = useState(false)
    const [showPostOptionsMenu, setPostOptionsMenu] = useState(false)
    const [isPostLiked, setPostLikeStatus] = useState(false)
    const [isPostDesliked, setPostDeslikeStatus] = useState(false)
    const [isCommentLiked, setCommentLikeStatus] = useState(false)
    const [isCommentDesliked, setCommentDeslikeStatus] = useState(false)

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

    const handleCommentInput = () => {
        if(showCommentInput) {
            setCommentInput(false)
        } else {
            setCommentInput(true)
            setPostFilesList(false)
        }
    }

    const handleCommentList = () => {
        if(showCommentList) {
            setCommentList(false)
        } else {
            setCommentList(true)
        }
    }

    const performPostLike = () => {
        if(isPostLiked) {
            setPostLikeStatus(false)
        } else {
            setPostLikeStatus(true)
            setPostDeslikeStatus(false)
        }
    }

    const performPostDeslike = () => {
        if(isPostDesliked) {
            setPostDeslikeStatus(false)
        } else {
            setPostDeslikeStatus(true)
            setPostLikeStatus(false)
        }
    }

    const performCommentLike = () => {
        if(isCommentLiked) {
            setCommentLikeStatus(false)
        } else {
            setCommentLikeStatus(true)
            setCommentDeslikeStatus(false)
        }
    }

    const performCommentDeslike = () => {
        if(isCommentDesliked) {
            setCommentDeslikeStatus(false)
        } else {
            setCommentDeslikeStatus(true)
            setCommentLikeStatus(false)
        }
    }

    const handlePostFilesSection = () => {
        if(showPostFilesList) {
            setPostFilesList(false)
        } else {
            setPostFilesList(true)
            setCommentInput(false)
        }
    }

    const handleCommentFilesSection = () => {
        if(showCommentFilesList) {
            setCommentFilesList(false)
        } else {
            setCommentFilesList(true)
        }
    }

    const boo = () => {
        alert('oiii')
    }

    const handlePostOptionsMenu = () => {
        if(showPostOptionsMenu) {
            setPostOptionsMenu(false)
        } else {
            setPostOptionsMenu(true)
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
                                {
                                    showPostOptionsMenu ? (
                                        <ul className='post__options__menu'>
                                            <li onClick={boo}><MdEdit className='post__options__menu__icon' />Editar publicação</li>
                                            <li><AiFillDelete className='post__options__menu__icon' />Deletar publicação</li>
                                        </ul>
                                    ) : ''
                                }
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='post__author__img'/>
                                <div className='post__infos'>
                                    <span className='post__author__name'>Matheus1337</span>
                                    <span className='post__author__title'>Professor de matemática</span>
                                    <span className='post__creation_time'>17:45</span>
                                </div>
                                <button onClick={handlePostOptionsMenu} className='post__options__btn'><BsThreeDots /></button>
                                <p className='post__content'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et ipsum vel nunc ultricies posuere nec pulvinar purus. Ut id feugiat odio. Mauris sagittis urna ut rhoncus convallis. Praesent tincidunt elementum enim, et gravida enim. Nullam vestibulum nibh in leo viverra consequat. Pellentesque vestibulum tempus auctor. Phasellus lacinia ante non scelerisque pretium. Maecenas vel quam sit amet velit vehicula pellentesque.
                                    Sed volutpat purus nec sem ullamcorper sagittis. Morbi felis mi, facilisis nec mauris at, finibus pulvinar justo. Suspendisse facilisis neque sapien, vel vehicula neque bibendum gravida. Aliquam vel luctus dui, suscipit aliquet justo. Mauris aliquam eu urna vitae mollis. In porttitor erat sit amet eleifend ullamcorper. Pellentesque ultrices lorem non justo mollis, ut ornare leo condimentum. Integer quis erat condimentum arcu tempor dignissim at in augue. Vivamus dui lectus, condimentum at ornare ornare, maximus et nibh. Phasellus venenatis imperdiet neque in faucibus. Donec semper erat vel ultrices sollicitudin. Suspendisse aliquet, ligula quis fermentum viverra, nisi nibh porta metus, a lacinia quam diam sit amet ante. Aenean rhoncus ex at finibus pretium.
                                </p>
                                {comments.length > 0 ? <button onClick={handleCommentList} className="handleComments__btn">{`${comments.length} comentários` }</button> : ''}
                                <hr />
                                <div className='post__action__btns'>
                                    <button onClick={performPostLike}><AiFillLike />{isPostLiked ? 15 : 'Like'}</button>
                                    <button onClick={performPostDeslike}><AiFillDislike />{isPostDesliked ? 3 : 'Deslike'}</button>
                                    <button onClick={handleCommentInput}><FaCommentAlt/>Comentar</button>
                                    <button onClick={handlePostFilesSection}><FaBook />Materiais</button>
                                </div>
                                {
                                    showCommentInput ? (
                                        <div className='post__comment__input'>
                                            <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='post__author__img'/>
                                            <input type="text" placeholder='adicionar comentário'/>
                                            <input type="file" id="add_material__comment__btn" name='files' multiple/>
                                            <label for="add_material__comment__btn" className=""><FaBook className="material__comment__icon"/></label>
                                        </div>
                                    ) : ''
                                }
                                {
                                    showPostFilesList ? (
                                        <div className='post__files__wrapper'>
                                            <FileButton file='matheus.pdf' />
                                            <FileButton file='matheus.jpeg' />
                                            <FileButton file='matheus.docx' />
                                        </div>
                                    ) : ''
                                }
                                {
                                    showCommentList ? (
                                        <div className='comment__container'>
                                            <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='post__author__img'/>
                                            <div className='comment_body'>
                                                <div className='comment__infos'>
                                                    <span className='comment__author__name'>Matheus1337</span>
                                                    <span className='comment__author__title'>Professor de matemática</span>
                                                    <span className='comment__creation_time'>17:45</span>
                                                </div>
                                                <button className='comment__options__btn'><BsThreeDots /></button>
                                                <p className='comment__content'>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et ipsum vel nunc ultricies posuere nec pulvinar purus. Ut id feugiat odio. Mauris sagittis urna ut rhoncus convallis. Praesent tincidunt elementum enim, et gravida enim. Nullam vestibulum nibh in leo viverra consequat. Pellentesque vestibulum tempus auctor. Phasellus lacinia ante non scelerisque pretium.
                                                </p>
                                            </div>
                                            <div className='comment__action__btns'>
                                                <button onClick={performCommentLike}><AiFillLike className='comment__action__btn__icon' />{isCommentLiked ? 5 : 'Like'}</button>
                                                <button onClick={performCommentDeslike}><AiFillDislike className='comment__action__btn__icon' />{isCommentDesliked ? 3 : 'Deslike'}</button>
                                                <button onClick={handleCommentFilesSection}><FaBook className='comment__action__btn__icon' />Materiais</button>
                                            </div>
                                            {
                                                showCommentFilesList ? (
                                                    <div className='comment__files__wrapper'>
                                                        <FileButton file='matheus.pdf' />
                                                        <FileButton file='matheus.jpeg' />
                                                        <FileButton file='matheus.docx' />
                                                </div>
                                                ) : ''
                                            }
                                        </div>
                                    ) : ''
                                }
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
