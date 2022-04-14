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
    const [commentContent, setCommentContent] = useState('')
    const [commentFiles, setCommentFiles] = useState([])
    const [postUpdatedTimes, setPostUpdatedTimes] = useState(0)
    const [targetId, setTargetId] = useState('') 

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
      }, [postUpdatedTimes])

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

        if(Array.from(files).length > 3) {
            alert('You can only upload a maximum of three files per post.')
        }

        const formData = new FormData()
        formData.append('content', content)
        Array.from(files).forEach(file => {
            formData.append('files', file)
        })
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

    const handleCommentInput = (e) => {
        setTargetId(e.target.value)
        if(showCommentInput) {
            setCommentInput(false)
            setTargetId('')
            //setCommentIcon(<FaRegCommentAlt />)
        } else {
            setCommentInput(true)
            setPostFilesList(false)
            //setCommentIcon(<FaCommentAlt />)
        }
    }

    const handleCommentList = () => {
        if(showCommentList) {
            setCommentList(false)
        } else {
            setCommentList(true)
        }
    }

    const performPostLike = async (e) => {
        const postId = e.target.value
        const formData = new FormData()
        formData.append('isLiked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}`, formData, {headers})
            setPostUpdatedTimes(postUpdatedTimes + 1)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const performPostDeslike = async (e) => {
        const postId = e.target.value
        const formData = new FormData()
        formData.append('isDesliked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}`, formData, {headers})
            setPostUpdatedTimes(postUpdatedTimes + 1)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const performCommentLike = async (e) => {
        const [commentId, postId] = e.target.className.split(' ')
        const formData = new FormData()
        formData.append('isLiked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}/comments/${commentId}`, formData, {headers})
            setPostUpdatedTimes(postUpdatedTimes + 1)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const performCommentDeslike = async (e) => {
        const [commentId, postId] = e.target.className.split(' ')
        const formData = new FormData()
        formData.append('isDesliked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}/comments/${commentId}`, formData, {headers})
            setPostUpdatedTimes(postUpdatedTimes + 1)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const handlePostFilesSection = (e) => {
        setTargetId(e.target.value)
        if(showPostFilesList) {
            setPostFilesList(false)
            setTargetId('')
        } else {
            setPostFilesList(true)
            setCommentInput(false)
        }
    }

    const handleCommentFilesSection = (e) => {
        setTargetId(e.target.value)
        if(showCommentFilesList) {
            setCommentFilesList(false)
            setTargetId('')
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

    const createComment = async (postId) => {
        if(commentContent.length == 0) {
            alert('The comment content cannot be null.')
            return 
        } else if(content.length > 300) {
            alert('The comment content must be a maximum of 300 characters.')
            return 
        }

        if(Array.from(commentFiles).length > 3) {
            alert('You can only upload a maximum of three files per comment.')
        }

        try {
            const formData = new FormData()
            formData.append('content', commentContent)
        
            if(Array.from(commentFiles).length > 0) {
                Array.from(commentFiles).forEach(file => {
                    formData.append('files', file)
                })
            }

            const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}
            await api.post(`groups/${id}/posts/${postId}/comments`, formData, {headers})
            alert('Comentário criado com sucesso.')
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const submitComment = (e) => {
        const postId = e.target.className
        if(e.key === 'Enter') {
            createComment(postId)
        }
    }

    const deletePost = async (e) => {
        const postId = e.target.className
        try {
            await api.delete(`groups/${id}/posts/${postId}/`, {headers})
            alert('Postagem excluída com sucesso.')
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const deleteComment = async(e) => {
        const [commentId, postId] = e.target.className.split(' ')
        try {
            await api.delete(`groups/${id}/posts/${postId}/comments/${commentId}`, {headers})
            alert('Comentário excluído com sucesso.')
        } catch(err) {
            alert(err.response.data.name)
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
                                            <li onClick={deletePost} className={post._id}><AiFillDelete className='post__options__menu__icon' />Deletar publicação</li>
                                        </ul>
                                    ) : '' 
                                }
                                <img src={`https://hakuna-1337.s3.amazonaws.com/${post.author.profilePic}`} className='post__author__img'/>
                                <div className='post__infos'>
                                    <span className='post__author__name'>{post.author.username}</span>
                                    {post.author.type === 'teacher' ? <span className='post__author__title'>Professor de {post.author.area}</span> : ''}
                                    <span className='post__creation_time'>{post.creationTime}</span>
                                </div>
                                {post.author._id == userId ? <button onClick={handlePostOptionsMenu} className='post__options__btn'><BsThreeDots /></button> : ''}
                                <p className='post__content'>
                                    {post.content}
                                </p>
                                {post.likes.length > 0 || post.deslikes.length > 0 ?  <span className="post__reaction__like"><AiFillLike />{post.likes.length}</span> : ''}
                                {post.deslikes.length > 0 || post.likes.length > 0 ? <span className="post__reaction__deslike"><AiFillDislike />{post.deslikes.length}</span> : ''}
                                {post.comments.length > 0 ? <button onClick={handleCommentList} className="handleComments__btn">{post.comments.length > 1 ? `${post.comments.length} comentários` : `${post.comments.length} comentário`}</button> : ''}
                                <hr />
                                <div className='post__action__btns'>
                                    {
                                        screenWidth > 200 ? (
                                            <>
                                                <button onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <AiFillLike /> : <AiOutlineLike />}Like</button>
                                                <button onClick={performPostDeslike} value={post._id}>{post.deslikes.includes(userId) ? <AiFillDislike /> : <AiOutlineDislike /> }Deslike</button>
                                                <button onClick={handleCommentInput} value={post._id} >{targetId == post._id ? <FaCommentAlt /> : <FaRegCommentAlt />}Comentar</button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}>{materialIcon}Materiais</button> : ''}
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <AiFillLike /> : <AiOutlineLike />}Like{isPostLiked ? post.likes.length : ''}</button>
                                                <button onClick={performPostDeslike} value={post._id}>{isPostDesliked && targetId == post._id ? <AiFillDislike /> : <AiOutlineDislike /> }{isPostDesliked ? post.deslikes.length : ''}</button>
                                                <button onClick={handleCommentInput} value={post._id}>{targetId == post._id ? <FaCommentAlt /> : <FaRegCommentAlt />}</button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}>{materialIcon}</button> : ''}
                                            </>
                                        )
                                    }
                                </div>
                                {
                                    showCommentInput && targetId == post._id? (
                                        <div className='post__comment__input'>
                                            <img src={`https://hakuna-1337.s3.amazonaws.com/${post.author.profilePic}`} className='post__author__img'/>
                                            <input type="text" placeholder='adicionar comentário' className={post._id} onKeyDown={submitComment} onChange={e => setCommentContent(e.target.value)}/>
                                            <input type="file" id="add_material__comment__btn" onChange={e => setCommentFiles(e.target.files)} name='files' multiple/>
                                            <label for="add_material__comment__btn" className=""><FaBook className="material__comment__icon"/></label>
                                        </div>
                                    ) : ''
                                }
                                {
                                    showPostFilesList && targetId == post._id ?
                                    (
                                        <div className='post__files__wrapper'>
                                            {
                                             post.files.length > 0 ?
                                             post.files.map(file => {
                                                 return (
                                                    <FileButton file={file} />  
                                                 )
                                             }) : ''
                                            }
                                        </div>
                                    ) : '' 
                                }
                                {
                                    showCommentList ? (
                                        <div className='comment__container'>
                                            {
                                                post.comments.map(comment => {
                                                    return (
                                                        <div className="comment__item">
                                                            <img src={`https://hakuna-1337.s3.amazonaws.com/${comment.author.profilePic}`} className='post__author__img'/>
                                                            <div className='comment_body'>
                                                            {
                                                                showCommentOptionsMenu ? (
                                                                    <ul className='comment__options__menu'>
                                                                        <li onClick={boo}><MdEdit className='comment__options__menu__icon' />Editar comentário</li>
                                                                        <li onClick={deleteComment} className={comment._id + ' ' + comment.post}><AiFillDelete className='comment__options__menu__icon' />Deletar comentário</li>
                                                                    </ul>
                                                                ) : ''
                                                            }
                                                                <div className='comment__infos'>
                                                                    <span className='comment__author__name'>{comment.author.username}</span>
                                                                    {comment.author.type == 'teacher'? <span className='comment__author__title'>Professor de {comment.author.area}</span> : ''}
                                                                    <span className='comment__creation_time'>{comment.creationTime}</span>
                                                                </div>
                                                                <button className='comment__options__btn' onClick={handleCommentOptionsMenu}><BsThreeDots /></button>
                                                                <p className='comment__content'>
                                                                    {comment.content}
                                                                </p>
                                                            </div>
                                                            <div className='comment__reactions__wrapper'>
                                                                {comment.likes.length > 0 || comment.deslikes.length > 0 ?  <span className="comment__reaction__like"><AiFillLike />{comment.likes.length}</span> : ''}
                                                                {comment.deslikes.length > 0 || comment.likes.length > 0 ? <span className="comment__reaction__deslike"><AiFillDislike />{comment.deslikes.length}</span> : ''}
                                                            </div>
                                                            <div className='comment__action__btns'>
                                                                <button onClick={performCommentLike} className={comment._id + ' ' + comment.post}>{comment.likes.includes(userId) ? <AiFillLike /> : <AiOutlineLike />}Like</button>
                                                                <button onClick={performCommentDeslike} className={comment._id + ' ' + comment.post}>{post.deslikes.includes(userId) ? <AiFillDislike /> : <AiOutlineDislike />}Deslike</button>
                                                                {comment.files.length > 0 ? <button onClick={handleCommentFilesSection} value={comment._id}><FaBook className='comment__action__btn__icon' />Materiais</button> : ''}
                                                            </div>
                                                            {
                                                                showCommentFilesList && targetId == comment._id ? (
                                                                    <div className='comment__files__wrapper'>
                                                                        {
                                                                            comment.files.map(file => {
                                                                                return (<FileButton file={file} />)
                                                                            })
                                                                        }
                                                                    </div>
                                                                ) : ''
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
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
