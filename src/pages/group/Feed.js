import React, {useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { HiLogout, HiUsers, HiUserGroup } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill, BsThreeDots, BsFillXCircleFill } from "react-icons/bs";
import { AiFillDislike, AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDelete, AiOutlineHeart } from "react-icons/ai";
import { MdEdit, MdUpload, MdClose } from "react-icons/md";
import {FaBook, FaCommentAlt, FaRegCommentAlt, FaHandsHelping, FaSearch} from 'react-icons/fa'
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
    const [commentTargetId, setCommentTargetId] = useState('') 
    const [showSearchInput, setSearchInputVisibility] = useState(false) 
    const [filter, setFilter] = useState('')
    const [isPostsFiltered, setPostsFilteredStatus] = useState(false)
    const [filterButtonVisibility, setFilterButtonVisibility] = useState(false)
    const [searchModeOn, setSearchMode] = useState(false)
    const [reloadComponents, setReloadComponents] = useState(false)
    const [postEditionMode, setPostEditionMode] = useState(false)
    const [editablePost, setEditablePost] = useState({})

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
            setPosts(posts.reverse())
            setReloadComponents(false)
          } catch(err) {
            alert(err.response.data.name)
          }
        }
        getMods()
      }, [reloadComponents, searchModeOn])

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
        setReloadComponents(true)
    }

    const quitGroup = async () => {
        try {
            const isConfirmed = window.confirm('Are you sure that you want to leave this group?')
            if(!isConfirmed) return
            await api.delete(`members/group/${id}`, {headers})
            history.push('/home')
        } catch(err) {
            alert(err.response.data.error)
        }
    }

    const handleCommentInput = (e) => {
        setCommentTargetId(e.currentTarget.value)
        if(showCommentInput) {
            setCommentInput(false)
            setCommentTargetId('')
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
        const postId = e.currentTarget.value
        const formData = new FormData()
        formData.append('isLiked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}`, formData, {headers})
            setReloadComponents(true)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const performPostDeslike = async (e) => {
        const postId = e.currentTarget.value
        const formData = new FormData()
        formData.append('isDesliked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}`, formData, {headers})
            setReloadComponents(true)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const performCommentLike = async (e) => {
        const [commentId, postId] = e.currentTarget.className.split(' ')
        const formData = new FormData()
        formData.append('isLiked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}/comments/${commentId}`, formData, {headers})
            setReloadComponents(true)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const performCommentDeslike = async (e) => {
        const [commentId, postId] = e.currentTarget.className.split(' ')
        const formData = new FormData()
        formData.append('isDesliked', true)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            await api.patch(`groups/${id}/posts/${postId}/comments/${commentId}`, formData, {headers})
            setReloadComponents(true)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const handlePostFilesSection = (e) => {
        setTargetId(e.currentTarget.value)
        if(showPostFilesList) {
            setPostFilesList(false)
            setTargetId('')
        } else {
            setPostFilesList(true)
            setCommentInput(false)
        }
    }

    const handleCommentFilesSection = (e) => {
        setTargetId(e.currentTarget.value)
        if(showCommentFilesList) {
            setCommentFilesList(false)
            setTargetId('')
        } else {
            setCommentFilesList(true)
        }
    }

    const handlePostOptionsMenu = (e) => {
        setTargetId(e.currentTarget.value)
        if(showPostOptionsMenu) {
            setPostOptionsMenu(false)
            setTargetId('')
        } else {
            setPostOptionsMenu(true)
        }
    }

    const handleCommentOptionsMenu = (e) => {
        setTargetId(e.currentTarget.value)
        if(showCommentOptionsMenu) {
            setCommentOptionsMenu(false)
            setTargetId('')
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
            setReloadComponents(true)
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
            const isConfirmed = window.confirm('Are you sure that you want to delete this post?')
            if(!isConfirmed) return
            await api.delete(`groups/${id}/posts/${postId}/`, {headers})
            alert('Postagem excluída com sucesso.')
            setReloadComponents(true)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const deleteComment = async(e) => {
        const [commentId, postId] = e.target.className.split(' ')
        try {
            const isConfirmed = window.confirm('Are you sure that you want to delete this comment?')
            if(!isConfirmed) return 
            await api.delete(`groups/${id}/posts/${postId}/comments/${commentId}`, {headers})
            alert('Comentário excluído com sucesso.')
            setReloadComponents(true)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const handleSearchInput = () => {
        if(showSearchInput) {
            setSearchInputVisibility(false)
        } else {
            setSearchInputVisibility(true)
        }
    }
    const searchPost = async (e) => {
        e.preventDefault()
        setPostsFilteredStatus(true)
        setFilterButtonVisibility(true)
        setSearchMode(true)

        try {
            const {data} = await api.get(`groups/${id}/posts?content=${filter}`, {headers})
            const {posts} = data
            setPosts(posts)
          } catch(err) {
            alert(err.response.data.name)
          }
    }

    const removeFilter = () => {
        const searchInput = document.getElementsByClassName('search__post__input')[0]
        searchInput.value = ''
        setFilterButtonVisibility(false)
        setSearchMode(false)
    }

    const goToProfile = (e) => {
        const [, id] = e.currentTarget.className.split(' ')
        history.push(`/${id}`)
    }

    const enablePostEditionMode = async (e) => {
        const postId = e.currentTarget.className
        const input = document.getElementsByClassName('form__textarea')[0]
        try {
            const {data} = await api.get(`groups/${id}/posts/${postId}`, {headers})
            const {content, files} = data
            input.innerHTML = content
            setContent(content)
            setEditablePost(data)
            setPostEditionMode(true)
            setPostOptionsMenu(false)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const editPost = (e) => {
        e.preventDefault()
        console.log('post content', content)
        console.log('oi')
    }

    const cancelPostEdition = () => {
        const input = document.getElementsByClassName('form__textarea')[0]
        input.innerHTML = ''
        setPostEditionMode(false)
        setEditablePost({})
        setContent('')
        setFiles([]) 
    }
    
    return (
        <>
        <NavBar />
            <main>
                <Container>
                <SearchBar />
                <Aside />
                <div className="content">
                    <div className='content__title__wrapper'>
                        <h2 className="content__title"><HiUserGroup />{groupName}</h2>
                    </div>
                    <div className="group__options">
                        <Link to={`/group/${id}/members`} className="group__options__link"><HiUsers className="group__options__icon"/>Membros</Link>
                        <button className="group__options__btn" style={showSearchInput ? {backgroundColor: '#3799CE'} : {backgroundColor: '#464646'}} onClick={handleSearchInput}><FaSearch className="group__options__icon"/>Buscar</button>
                        <Link to={`/group/${id}/files`} className="group__options__link"><FaBook className="group__options__icon"/>Materiais</Link>
                        {!isMod ? '' : <Link to={`/group/${id}/config`} className="group__options__link"><BsFillGearFill className="group__options__icon"/>Configurações</Link>}
                        <button className="group__options__btn" onClick={quitGroup}><HiLogout className="group__options__icon"/>Sair</button>
                    </div>
                    {
                        showSearchInput ? (
                            <>
                                <div className="searchbar">
                                    <input type="text" className="search__post__input" onChange={e => setFilter(e.target.value)} placeholder="Busque uma postagem por palavra-chave"/>
                                    <button className="searchbar__btn" onClick={searchPost}><FaSearch className="searchbar__icon"/></button>
                                </div>
                                {filterButtonVisibility ? <button className='filter__btn'>{filter}<MdClose onClick={removeFilter}/></button> : ''}
                            </>
                        ) : ''
                    }
                    <form action="" className="post__form">
                        <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" placeholder='Compartilhe algo com os seus colegas' onChange={e => setContent(e.target.value)}></textarea>
                        <div className='post__btn__wrapper'>
                            {
                                !postEditionMode ? 
                                <button className="form__btn" onClick={handlePost}>Postar</button> :
                                <button className="form__btn" onClick={editPost}>Salvar</button>
                            }
                            <input type="file" id="add_material__btn" name='files' onChange={e => setFiles(e.target.files)} multiple/>
                            <label for="add_material__btn" className="material__btn"><MdUpload/>Materiais</label> 
                            {postEditionMode ? <button type='button' className="cancel__post__edtion" onClick={cancelPostEdition}>Cancelar</button> : '' }
                        </div>
                        {
                            Object.keys(editablePost).length > 0 && editablePost.files.length > 0 ? 
                            (
                                <div className='post__files__wrapper'>
                                    {
                                        editablePost.files.length > 0 ?
                                        editablePost.files.map(file => {
                                            return (
                                            <FileButton file={file} edit="true"/>  
                                            )
                                        }) : ''
                                    }
                                </div>
                            ) : '' 
                        }
                    </form>
                    <div className="group__posts">
                    {  posts.length !== 0 ?
                       posts.map((post, index) => {
                           return (
                            <>
                            <div className='post__item' key={index}>
                                {
                                    showPostOptionsMenu && targetId == post._id ? 
                                    post.author._id === userId ? (
                                            <ul className='post__options__menu'>
                                                <li onClick={enablePostEditionMode} className={post._id}><MdEdit className='post__options__menu__icon'/>Editar</li>
                                                <li onClick={deletePost} className={post._id}><AiFillDelete className='post__options__menu__icon' />Deletar</li>
                                                <li><FaHandsHelping className='post__options__menu__icon' />Solicitar ajuda</li>
                                            </ul>
                                        ) : (
                                            <ul className='post__options__menu'>
                                                <li onClick={deletePost} className={post._id}><AiFillDelete className='post__options__menu__icon' />Deletar</li>
                                                <li><FaHandsHelping className='post__options__menu__icon' />Solicitar ajuda</li>
                                            </ul>
                                        )
                                     : '' 
                                }
                                <img src={`https://hakuna-1337.s3.amazonaws.com/${post.author.profilePic}`} className={`post__author__img ${post.author._id}`} onClick={goToProfile}/>
                                <div className='post__infos'>
                                    <span className={`post__author__name ${post.author._id}`} onClick={goToProfile}>{post.author.username}</span>
                                    {post.author.type === 'teacher' ? <span className='post__author__title'>Professor de {post.author.area}</span> : ''}
                                    <span className='post__creation_time'>{post.creationTime}</span>
                                </div>
                                {post.author._id == userId || isMod ? <button onClick={handlePostOptionsMenu} value={post._id} className='post__options__btn'><BsThreeDots /></button> : ''}
                                <p className='post__content'>
                                    {post.content}
                                </p>
                                {post.comments.length > 0 ? <button onClick={handleCommentList} className="handleComments__btn">{post.comments.length > 1 ? `${post.comments.length} comentários` : `${post.comments.length} comentário`}</button> : ''}
                                <hr />
                                <div className='post__action__btns'>
                                    {
                                        screenWidth > 200 ? (
                                            <>
                                                <button onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <AiFillLike /> : <AiOutlineLike />}{post.likes.length}</button>
                                                <button onClick={performPostDeslike} value={post._id}>{post.deslikes.includes(userId) ? <AiFillDislike /> : <AiOutlineDislike /> }{post.deslikes.length}</button>
                                                <button onClick={handleCommentInput} value={post._id} >{commentTargetId == post._id ? <FaCommentAlt /> : <FaRegCommentAlt />}Comentar</button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}>{materialIcon}Materiais</button> : ''}
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <AiFillLike /> : <AiOutlineLike />}{post.likes.length}</button>
                                                <button onClick={performPostDeslike} value={post._id}>{isPostDesliked && targetId == post._id ? <AiFillDislike /> : <AiOutlineDislike /> }{post.deslikes.length}</button>
                                                <button onClick={handleCommentInput} value={post._id}>{commentTargetId == post._id ? <FaCommentAlt /> : <FaRegCommentAlt />}</button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}>{materialIcon}</button> : ''}
                                            </>
                                        )
                                    }
                                </div>
                                {
                                    showCommentInput && commentTargetId == post._id? (
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
                                                            <img src={`https://hakuna-1337.s3.amazonaws.com/${comment.author.profilePic}`} className={`post__author__img ${comment.author._id}`} onClick={goToProfile}/>
                                                            <div className='comment_body'>
                                                            {
                                                                showCommentOptionsMenu && targetId == comment._id ? (
                                                                    <ul className='comment__options__menu'>
                                                                        <li><MdEdit className='comment__options__menu__icon' />Editar comentário</li>
                                                                        <li onClick={deleteComment} className={comment._id + ' ' + comment.post}><AiFillDelete className='comment__options__menu__icon' />Deletar comentário</li>
                                                                    </ul>
                                                                ) : ''
                                                            }
                                                                <div className='comment__infos'>
                                                                    <span className='comment__author__name'>{comment.author.username}</span>
                                                                    {comment.author.type == 'teacher'? <span className='comment__author__title'>Professor de {comment.author.area}</span> : ''}
                                                                    <span className='comment__creation_time'>{comment.creationTime}</span>
                                                                </div>
                                                                <button className='comment__options__btn' value={comment._id} onClick={handleCommentOptionsMenu}><BsThreeDots /></button>
                                                                <p className='comment__content'>
                                                                    {comment.content}
                                                                </p>
                                                            </div>
                                                            <div className='comment__action__btns'>
                                                                <button onClick={performCommentLike} className={comment._id + ' ' + comment.post}>{comment.likes.includes(userId) ? <AiFillLike /> : <AiOutlineLike />}{comment.likes.length}</button>
                                                                <button onClick={performCommentDeslike} className={comment._id + ' ' + comment.post}>{post.deslikes.includes(userId) ? <AiFillDislike /> : <AiOutlineDislike />}{comment.deslikes.length}</button>
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
                        : (
                            !isPostsFiltered ? (
                                <>
                                    <CgFeed className="group__feed__icon"/>
                                    <p className="group__feed__message">Nenhuma publicação foi realizada ainda</p>
                                </>
                            ) : (
                                <>
                                    <CgFeed className="group__feed__icon"/>
                                    <p className="group__feed__message">{`Nenhuma publicação com a palavra-chave "${filter}" foi encontrada`}</p>
                                </>
                            )
                          )
                    }
                    </div>
                </div>
                </Container >  
            </main>
        </>
    )
}
