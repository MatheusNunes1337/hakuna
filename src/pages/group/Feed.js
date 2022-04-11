import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { HiLogout, HiUsers } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill, BsThreeDots } from "react-icons/bs";
import { AiFillDislike, AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDelete, AiOutlineHeart } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import {FaBook, FaCommentAlt, FaRegCommentAlt} from 'react-icons/fa'
import { CgFeed } from "react-icons/cg";

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import FileButton from '../../components/FileDownloadButton';

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [groupName, setGroupName] = useState('')
    const [isMod, setMod] = useState(false)
    const [comments, setComments] = useState(['oi', 'tchau'])
    const [showCommentInput, setCommentInput] = useState(false)
    const [showCommentList, setCommentList] = useState(false)
    const [showPostFilesList, setPostFilesList] = useState(false)
    const [showCommentFilesList, setCommentFilesList] = useState(false)
    const [showPostOptionsMenu, setPostOptionsMenu] = useState(false)
    const [showCommentOptionsMenu, setCommentOptionsMenu] = useState(false)
    const [isPostLiked, setPostLikeStatus] = useState(false)
    const [isPostDesliked, setPostDeslikeStatus] = useState(false)
    const [isCommentLiked, setCommentLikeStatus] = useState(false)
    const [isCommentDesliked, setCommentDeslikeStatus] = useState(false)
    const [postLikeIcon, setPostLikeIcon] = useState(<AiOutlineLike />)
    const [postDeslikeIcon, setPostDeslikeIcon] = useState(<AiOutlineDislike />)
    const [commentLikeIcon, setCommentLikeIcon] = useState(<AiOutlineLike className='comment__action__btn__icon' />)
    const [commentDeslikeIcon, setCommentDeslikeIcon] = useState(<AiOutlineDislike className='comment__action__btn__icon' />)
    const [commentIcon, setCommentIcon] = useState(<FaRegCommentAlt />)
    const [materialIcon, setMaterialIcon] = useState(<FaBook />)
    const [screenWidth, setScreenWidth] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState([])

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    useEffect(() => {
        const getMods = async () => {
          try {
            const {data} = await api.get(`groups/${id}`, {headers})
            const {mods, name, posts} = data
            console.log('posts', posts)
            const moderators = mods.map(mod => mod._id)
            if(moderators.includes(userId)) setMod(true)
            setGroupName(name)
            setPosts(posts)
          } catch(err) {
            alert(err)
          }
        }
        getMods()
      }, [])

    const getScreenWidth = () => window.screen.availWidth
        
    useEffect(() => {
        setScreenWidth(getScreenWidth)
    }, [screenWidth])

    const handlePost = async (e) => {
        e.preventDefault()

        if(content.length == 0) {
            alert('The post content cannot be null.')
            return 
        } else if(content.length > 2000) {
            alert('The post content must be a maximum of 2000 characters.')
            return 
        }

        if(files.length > 3) {
            alert('You can only upload a maximum of three files per post.')
        }

        const formData = new FormData()
        formData.append('content', content)
        formData.append('files', files)

        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}
        await api.post(`groups/${id}/posts`, formData, {headers})
        alert('Post criado com sucesso')
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
            setCommentIcon(<FaRegCommentAlt />)
        } else {
            setCommentInput(true)
            setPostFilesList(false)
            setCommentIcon(<FaCommentAlt />)
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
            setPostLikeIcon(<AiOutlineLike />)
        } else {
            setPostLikeStatus(true)
            setPostDeslikeStatus(false)
            setPostLikeIcon(<AiFillLike />)
            setPostDeslikeIcon(<AiOutlineDislike />)
        }
    }

    const performPostDeslike = () => {
        if(isPostDesliked) {
            setPostDeslikeStatus(false)
            setPostDeslikeIcon(<AiOutlineDislike />)
        } else {
            setPostDeslikeStatus(true)
            setPostLikeStatus(false)
            setPostDeslikeIcon(<AiFillDislike />)
            setPostLikeIcon(<AiOutlineLike />)
        }
    }

    const performCommentLike = () => {
        if(isCommentLiked) {
            setCommentLikeStatus(false)
            setCommentLikeIcon(<AiOutlineLike className='comment__action__btn__icon' />)
        } else {
            setCommentLikeStatus(true)
            setCommentDeslikeStatus(false)
            setCommentLikeIcon(<AiFillLike className='comment__action__btn__icon' />)
            setCommentDeslikeIcon(<AiOutlineDislike className='comment__action__btn__icon' />)
        }
    }

    const performCommentDeslike = () => {
        if(isCommentDesliked) {
            setCommentDeslikeStatus(false)
            setCommentDeslikeIcon(<AiOutlineDislike className='comment__action__btn__icon' />)
        } else {
            setCommentDeslikeStatus(true)
            setCommentLikeStatus(false)
            setCommentDeslikeIcon(<AiFillDislike className='comment__action__btn__icon' />)
            setCommentLikeIcon(<AiOutlineLike className='comment__action__btn__icon' />)
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

    const handleCommentOptionsMenu = () => {
        if(showCommentOptionsMenu) {
            setCommentOptionsMenu(false)
        } else {
            setCommentOptionsMenu(true)
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
                    <h2 className="content__title">{groupName}</h2>
                    <div className="group__options">
                        <Link to={`/group/${id}/members`} className="group__options__link"><HiUsers className="group__options__icon"/>Membros</Link>
                        <Link to={`/group/${id}/files`} className="group__options__link"><FaBook className="group__options__icon"/>Materiais</Link>
                        <Link to="/home" className="group__options__link"><BsFillCameraVideoFill className="group__options__icon"/>Videochamadas</Link>
                        {!isMod ? '' : <Link to={`/group/${id}/config`} className="group__options__link"><BsFillGearFill className="group__options__icon"/>Configurações</Link>}
                        <button className="group__options__btn" onClick={quitGroup}><HiLogout className="group__options__icon"/>Sair</button>
                    </div>
                    <form action="" className="post__form" onSubmit={handlePost}>
                        <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" placeholder='Compartilhe algo com os seus colegas' onChange={e => setContent(e.target.value)}></textarea>
                        <button className="form__btn">Postar</button>
                        <input type="file" id="add_material__btn" name='files' onChange={e => setFiles(e.target.files)} multiple/>
                        <label for="add_material__btn" className="material__btn"><FaBook className="group__options__icon"/></label> 
                    </form>
                    <div className="group__posts">
                    {  posts.length !== 0 ?
                       posts.map((post, index) => {
                           return (
                            <>
                            <div className='post__item' key={index}>
                                {
                                    showPostOptionsMenu ? (
                                        <ul className='post__options__menu'>
                                            <li onClick={boo}><MdEdit className='post__options__menu__icon' />Editar publicação</li>
                                            <li value={post._id}><AiFillDelete className='post__options__menu__icon' />Deletar publicação</li>
                                        </ul>
                                    ) : ''
                                }
                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='post__author__img'/>
                                <div className='post__infos'>
                                    <span className='post__author__name'>{post.author.username}</span>
                                    {post.author.type === 'teacher' ? <span className='post__author__title'>Professor de {post.author.area}</span> : ''}
                                    <span className='post__creation_time'>{post.creationTime}</span>
                                </div>
                                <button onClick={handlePostOptionsMenu} className='post__options__btn'><BsThreeDots /></button>
                                <p className='post__content'>
                                    {post.content}
                                </p>
                                {post.comments.length > 0 ? <button onClick={handleCommentList} className="handleComments__btn">{`${comments.length} comentários` }</button> : ''}
                                <hr />
                                <div className='post__action__btns'>
                                    {
                                        screenWidth > 200 ? (
                                            <>
                                                <button onClick={performPostLike}>{postLikeIcon}{isPostLiked ? post.likes : 'Like'}</button>
                                                <button onClick={performPostDeslike}>{postDeslikeIcon}{isPostDesliked ? post.deslikes : 'Deslike'}</button>
                                                <button onClick={handleCommentInput}>{commentIcon}Comentar</button>
                                                <button onClick={handlePostFilesSection}>{materialIcon}Materiais</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={performPostLike}>{postLikeIcon}{isPostLiked ? post.likes : ''}</button>
                                                <button onClick={performPostDeslike}>{postDeslikeIcon}{isPostDesliked ? post.deslikes : ''}</button>
                                                <button onClick={handleCommentInput}>{commentIcon}</button>
                                                <button onClick={handlePostFilesSection}>{materialIcon}</button>
                                            </>
                                        )
                                    }
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
                                            <div className="comment__item">
                                                <img src='https://th.bing.com/th/id/OIP.s4XSrU8mt2ats3XCD7pOfgHaF7?pid=ImgDet&w=3000&h=2400&rs=1' className='post__author__img'/>
                                                <div className='comment_body'>
                                                    {
                                                        showCommentOptionsMenu ? (
                                                            <ul className='comment__options__menu'>
                                                                <li onClick={boo}><MdEdit className='comment__options__menu__icon' />Editar comentário</li>
                                                                <li><AiFillDelete className='comment__options__menu__icon' />Deletar comentário</li>
                                                            </ul>
                                                        ) : ''
                                                    }
                                                    <div className='comment__infos'>
                                                        <span className='comment__author__name'>Matheus1337</span>
                                                        <span className='comment__author__title'>Professor de matemática</span>
                                                        <span className='comment__creation_time'>17:45</span>
                                                    </div>
                                                    <button className='comment__options__btn' onClick={handleCommentOptionsMenu}><BsThreeDots /></button>
                                                    <p className='comment__content'>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et ipsum vel nunc ultricies posuere nec pulvinar purus. Ut id feugiat odio. Mauris sagittis urna ut rhoncus convallis. Praesent tincidunt elementum enim, et gravida enim. Nullam vestibulum nibh in leo viverra consequat. Pellentesque vestibulum tempus auctor. Phasellus lacinia ante non scelerisque pretium.
                                                    </p>
                                                </div>
                                                <div className='comment__action__btns'>
                                                    <button onClick={performCommentLike}>{commentLikeIcon}{isCommentLiked ? 5 : 'Like'}</button>
                                                    <button onClick={performCommentDeslike}>{commentDeslikeIcon}{isCommentDesliked ? 3 : 'Deslike'}</button>
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
                                        </div>
                                    ) : ''
                                }
                            </div>
                            </>
                            )
                       }) 
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
