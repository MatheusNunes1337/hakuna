import React, {useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { HiLogout, HiUsers, HiUserGroup } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill, BsThreeDots, BsFillXCircleFill } from "react-icons/bs";
import { AiFillDislike, AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDelete, AiOutlineHeart } from "react-icons/ai";
import { MdEdit, MdUpload, MdClose } from "react-icons/md";
import {FaBook, FaCommentAlt, FaRegCommentAlt, FaHandsHelping, FaSearch} from 'react-icons/fa'
import { CgFeed } from "react-icons/cg";
import {IoClose} from 'react-icons/io5'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import FileButton from '../../components/FileDownloadButton';

import group from '../../assets/images/group.png'
import searchIcon from '../../assets/images/search.png'
import book from '../../assets/images/books.png'
import settings from '../../assets/images/settings.png'
import leave from '../../assets/images/leave.png'
import upload from '../../assets/images/upload.png'
import dislike from '../../assets/images/dislike.png'
import dislike_outline from '../../assets/images/dislike_outline.png'
import like from '../../assets/images/like.png'
import like_outline from '../../assets/images/like_outline.png'
import comment from '../../assets/images/comment.png'
import comment_outline from '../../assets/images/comment_outline.png'
import addMaterial from '../../assets/images/add_material.png'
import editComment from '../../assets/images/edit_comment.png'
import editPost from '../../assets/images/editing.png'
import deleteIcon from '../../assets/images/trash.png'
import requestHelp from '../../assets/images/request_help.png'
import postIcon from '../../assets/images/post.png'
import setGroupIcon from '../../utils/setGroupIcon';
import ErrorModal from '../../components/ErrorModal';

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [groupName, setGroupName] = useState('')
    const [discipline, setDiscipline] = useState('')
    const [modsIdList, setModsIdLIst] = useState([])
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
    const [commentEditionMode, setCommentEditionMode] = useState(false)
    const [editablePost, setEditablePost] = useState({})
    const [editableComment, setEditableComment] = useState({})
    const [editCommentIds, setEditCommentIds] = useState([])
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [showSucessModal, setSucessModalStatus] = useState(false)
    let [showWarningModal, setWarningModalStatus] = useState(false)
    let [isOperationConfirmed, setConfirmOperation] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const history = useHistory()

    useEffect(() => {
        const getMods = async () => {
          try {
            const {data} = await api.get(`groups/${id}`, {headers})
            const {mods, name, posts, discipline} = data
            console.log('posts', posts)
            const moderators = mods.map(mod => mod._id)
            setModsIdLIst(moderators)
            if(moderators.includes(userId)) setMod(true)
            setGroupName(name)
            setDiscipline(discipline)
            setPosts(posts.reverse())
            setReloadComponents(false)
          } catch(err) {
            handleErrorModal(err.response.data.name)
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
            handleErrorModal('The post content cannot be null.')
            return 
        } else if(content.length > 2000) {
            handleErrorModal('The post content must be a maximum of 2000 characters.')
            return 
        }

        if(Array.from(files).length > 3) {
            handleErrorModal('You can only upload a maximum of three files per post.')
            return 
        }

        const formData = new FormData()
        formData.append('content', content)
        Array.from(files).forEach(file => {
            formData.append('files', file)
        })
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}
        if(!postEditionMode) {
            try {
                await api.post(`groups/${id}/posts`, formData, {headers})
                handleSucessModal('Postagem criada com sucesso')
            } catch(err) {
                if(!Array.isArray(err.response.data))
                    handleErrorModal(err.response.data.name)
                else 
                    handleErrorModal(err.response.data[0].name)
            }
        } else {
            try {
                await api.patch(`groups/${id}/posts/${editablePost._id}`, formData, {headers})
                handleSucessModal('Post editado com sucesso')
                setFiles([])
                setContent('')
                setPostEditionMode(false)
            } catch(err) {
                if(!Array.isArray(err.response.data))
                    handleErrorModal(err.response.data.name)
                else 
                    handleErrorModal(err.response.data[0].name)
            }
        }
        const input = document.getElementsByClassName('form__textarea')[0]
        input.value = ''
        setReloadComponents(true)
    }

    const quitGroup = async () => {
        try {
            handleWarningModal('Você tem certeza que deseja deixar esse grupo? Você não terá acesso as postagens e materiais')
            if(isOperationConfirmed) {
                await api.delete(`members/group/${id}`, {headers})
                history.push('/home')
            }
        } catch(err) {
            handleErrorModal(err.response.data.error)
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
            handleErrorModal(err.response.data.name)
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
            handleErrorModal(err.response.data.name)
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
            handleErrorModal(err.response.data.name)
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
            handleErrorModal(err.response.data.name)
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
            handleErrorModal('The comment content cannot be null.')
            return 
            
        } else if(content.length > 300) {
            handleErrorModal('The comment content must be a maximum of 300 characters.')
            return 
        } else if(Array.from(commentFiles).length > 3) {
            handleErrorModal('You can only upload a maximum of three files per comment.')
            return
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
            if(!commentEditionMode) {
                await api.post(`groups/${id}/posts/${postId}/comments`, formData, {headers})
                handleSucessModal('Comentário criado com sucesso.')
            } else {
                const [postId, commentId] = editCommentIds
                await api.patch(`groups/${id}/posts/${postId}/comments/${commentId}`, formData, {headers})
                handleSucessModal('Comentário editado com sucesso.')
            }
            setCommentFiles([])
            setCommentContent('')
            setCommentEditionMode(false)
            setReloadComponents(true)
        } catch(err) {
            if(!Array.isArray(err.response.data))
                handleErrorModal(err.response.data.name)
            else 
                handleErrorModal(err.response.data[0].name)
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
            handleWarningModal('Você tem certeza que deseja excluir essa postagem?')
            if(isOperationConfirmed) {
                await api.delete(`groups/${id}/posts/${postId}/`, {headers})
                alert('Postagem excluída com sucesso.')
                setReloadComponents(true)   
            }
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }
    }

    const deleteComment = async(e) => {
        const [commentId, postId] = e.target.className.split(' ')
        try {
            handleWarningModal('Você tem certeza que deseja excluir esse comentário?')
            if(isOperationConfirmed) {
                await api.delete(`groups/${id}/posts/${postId}/comments/${commentId}`, {headers})
                alert('Comentário excluído com sucesso.')
                setReloadComponents(true)
            }
        } catch(err) {
            handleErrorModal(err.response.data.name)
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
            if(!Array.isArray(err.response.data))
                handleErrorModal(err.response.data.name)
            else 
                handleErrorModal(err.response.data[0].name)
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
        const input = document.getElementsByClassName('form__textarea')[1]
        try {
            const {data} = await api.get(`groups/${id}/posts/${postId}`, {headers})
            const {content, files} = data
            input.innerHTML = content
            setContent(content)
            setEditablePost(data)
            setPostEditionMode(true)
            setPostOptionsMenu(false)
        } catch(err) {
            if(!Array.isArray(err.response.data))
                handleErrorModal(err.response.data.name)
            else 
                handleErrorModal(err.response.data[0].name)
        }
    }

    const enableCommentEditionMode = async (e) => {
        const [commentId, postId] = e.currentTarget.className.split(' ')
        const input = document.getElementsByClassName('form__textarea')[1]
        try {
            const {data} = await api.get(`groups/${id}/posts/${postId}/comments/${commentId}`, {headers})
            const {content, files} = data
            input.innerHTML = content
            setCommentContent(content)
            setEditableComment(data)
            setCommentEditionMode(true)
            setCommentOptionsMenu(false)
            setEditCommentIds([postId, commentId])
        } catch(err) {
            if(!Array.isArray(err.response.data))
                handleErrorModal(err.response.data.name)
            else 
                handleErrorModal(err.response.data[0].name)
        }
    }

    const cancelContentEdition = () => {
        const input = document.getElementsByClassName('form__textarea')[0]
        input.innerHTML = ''
        setPostEditionMode(false)
        setCommentEditionMode(false)
        setEditablePost({})
        setEditableComment({})
        setContent('')
        setCommentContent('')
        setFiles([]) 
    }

    const closeModal = () => {
        setErrorModalStatus(false)
        setSucessModalStatus(false)
        setWarningModalStatus(false)
        setConfirmOperation(false)
      }
  
      const confirmOperation = () => {
        setConfirmOperation(true)
      }
  
      const handleErrorModal = (message) => {
          setModalMessage(message)
          setErrorModalStatus(true)
      }
  
      const handleSucessModal = (message) => {
          setModalMessage(message)
          setSucessModalStatus(true)
      }
  
      const handleWarningModal = (message) => {
        setModalMessage(message)
        setWarningModalStatus(true)
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
                        <h2 className="content__title"><img src={setGroupIcon(discipline)} className='title__colorful__icon' />{groupName}</h2>
                    </div>
                    <div className="group__options">
                        <Link to={`/group/${id}/members`} className="group__options__link"><img src={group} className="group__options__icon"/>Membros</Link>
                        <button className="group__options__btn" style={showSearchInput ? {backgroundColor: '#3799CE'} : {backgroundColor: '#464646'}} onClick={handleSearchInput}><img src={searchIcon} className="group__options__icon"/>Buscar</button>
                        <Link to={`/group/${id}/files`} className="group__options__link"><img src={book} className="group__options__icon"/>Materiais</Link>
                        {!isMod ? '' : <Link to={`/group/${id}/config`} className="group__options__link"><img src={settings} className="group__options__icon"/>Configurações</Link>}
                        <button className="group__options__btn" onClick={quitGroup}><img src={leave} className="group__options__icon"/>Sair</button>
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
                            <button className="form__btn" onClick={handlePost}>Postar</button>
                            <input type="file" id="add_material__btn" name='files' onChange={e => setFiles(e.target.files)} multiple/>
                            <label for="add_material__btn" className="material__btn"><img src={upload} className="group__options__icon"/>Materiais</label> 
                        </div>
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
                                                <li onClick={enablePostEditionMode} className={post._id}><img src={editPost} className='post__options__menu__icon' />Editar postagem</li>
                                                <li onClick={deletePost} className={post._id}><img src={deleteIcon} className='post__options__menu__icon' />Deletar postagem</li>
                                                <li><img src={requestHelp} className='post__options__menu__icon' />Solicitar ajuda</li>
                                            </ul>
                                        ) : (
                                            <ul className='post__options__menu'>
                                                <li onClick={deletePost} className={post._id}><img src={deleteIcon} className='post__options__menu__icon' />Deletar postagem</li>
                                                <li><img src={requestHelp} className='post__options__menu__icon' />Solicitar ajuda</li>
                                            </ul>
                                        )
                                     : '' 
                                }
                                <img src={`https://hakuna-1337.s3.amazonaws.com/${post.author.profilePic}`} className={`post__author__img ${post.author._id}`} onClick={goToProfile}/>
                                <div className='post__infos'>
                                    <span className={modsIdList.includes(post.author._id) ? `post__author__name is__mod ${post.author._id}` : `post__author__name ${post.author._id}`}>{post.author.username}</span>
                                    {post.author.type === 'teacher' ? <span className='post__author__title'>Professor de {post.author.area}</span> : ''}
                                    <span className={post.updated ? 'post__creation_time updated__content' : 'post__creation_time'}>{post.creationTime}</span>
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
                                                <button onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <img src={like} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons"/> : <img src={like_outline} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons" />}{post.likes.length}</button>
                                                <button onClick={performPostDeslike} value={post._id}>{post.deslikes.includes(userId) ? <img src={dislike} style={{marginTop: '3px'}} className="post__reaction__icons"/> : <img src={dislike_outline} style={{marginTop: '3px'}} className="post__reaction__icons" /> }{post.deslikes.length}</button>
                                                <button onClick={handleCommentInput} value={post._id} ><img src={comment} style={{width: '22px', height: '22px'}} className="post__reaction__icons"/>Comentar</button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}><img src={book} className="post__reaction__icons" />Materiais</button> : ''}
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <img src={like} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons"/> : <img src={like_outline} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons" />}{post.likes.length}</button>
                                                <button onClick={performPostDeslike} value={post._id}>{post.deslikes.includes(userId) ? <img src={dislike} style={{marginTop: '3px'}} className="post__reaction__icons"/> : <img src={dislike_outline} style={{marginTop: '3px'}} className="post__reaction__icons" /> }{post.deslikes.length}</button>
                                                <button onClick={handleCommentInput} value={post._id} ><img src={comment} style={{width: '22px', height: '22px'}} className="post__reaction__icons"/></button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}><img src={book} className="post__reaction__icons" /></button> : ''}
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
                                            <label for="add_material__comment__btn" className=""><img src={addMaterial} className="material__comment__icon"/></label>
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
                                                                        <li onClick={enableCommentEditionMode} className={comment._id + ' ' + comment.post}><img src={editComment} className='comment__options__menu__icon' />Editar comentário</li>
                                                                        <li onClick={deleteComment} className={comment._id + ' ' + comment.post}><img src={deleteIcon} className='comment__options__menu__icon' />Deletar comentário</li>
                                                                    </ul>
                                                                ) : ''
                                                            }
                                                                <div className='comment__infos'>
                                                                    <span className={modsIdList.includes(comment.author._id) ? 'comment__author__name is__mod' : 'comment__author__name'}>{comment.author.username}</span>
                                                                    {comment.author.type == 'teacher'? <span className='comment__author__title'>Professor de {comment.author.area}</span> : ''}
                                                                    <span className={comment.updated ? 'comment__creation_time updated__content' : 'comment__creation_time'}>{comment.creationTime}</span>
                                                                </div>
                                                                <button className='comment__options__btn' value={comment._id} onClick={handleCommentOptionsMenu}><BsThreeDots /></button>
                                                                <p className='comment__content'>
                                                                    {comment.content}
                                                                </p>
                                                            </div>
                                                            <div className='comment__action__btns'>
                                                                <button onClick={performCommentLike} className={comment._id + ' ' + comment.post}>{comment.likes.includes(userId) ? <img src={like} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons"/> : <img src={like_outline} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons" />}{comment.likes.length}</button>
                                                                <button onClick={performCommentDeslike} className={comment._id + ' ' + comment.post}>{post.deslikes.includes(userId) ? <img src={dislike} style={{marginTop: '3px'}} className="post__reaction__icons"/> : <img src={dislike_outline} style={{marginTop: '3px'}} className="post__reaction__icons" />}{comment.deslikes.length}</button>
                                                                {comment.files.length > 0 ? <button onClick={handleCommentFilesSection} value={comment._id}><img src={book} className="post__reaction__icons" />Materiais</button> : ''}
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
                                    <img src={postIcon} className="any__user__icon"/>
                                    <p className="group__feed__message">Nenhuma publicação foi realizada ainda</p>
                                </>
                            ) : (
                                <>
                                    <img src={postIcon} className="any__user__icon"/>
                                    <p className="group__feed__message">{`Nenhuma publicação com a palavra-chave "${filter}" foi encontrada`}</p>
                                </>
                            )
                          )
                    }
                    </div>
                </div>
                <div className={postEditionMode || commentEditionMode ? 'edit__content__modal show__div' : 'edit__content__modal hide__div'}>
                    <div className='content__title__wrapper'>
                        <h2 className="content__title">{postEditionMode ? <img src={editPost} className='title__icon' /> : <img src={editComment} className='title__icon' />}{postEditionMode ? 'Editar postagem' : 'Editar comentário'}</h2>
                        <IoClose onClick={cancelContentEdition} className='close__edit__modal' />
                    </div>
                    <form action="" className="post__form">
                        {
                            postEditionMode ? 
                            <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" onChange={e => setContent(e.target.value)}></textarea> :
                            <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" onChange={e => setCommentContent(e.target.value)}></textarea>
                        }
                        <div className='post__btn__wrapper'>
                            {
                                postEditionMode ? 
                                    <button type='button' className="form__btn" onClick={handlePost}>Salvar</button> :
                                    <button type='button' className="form__btn" onClick={createComment}>Salvar</button>
                            }
                            {
                                postEditionMode ? 
                                (
                                    <>
                                        <input type="file" id="add_material__btn" name='files' onChange={e => setFiles(e.target.files)} multiple/>
                                        <label for="add_material__btn" className="material__btn"><img src={upload} className="group__options__icon"/>Materiais</label> 
                                    </>
                                ) :      
                               (
                                <>
                                    <input type="file" id="add_material__comment__btn" name='files' onChange={e => setCommentFiles(e.target.files)} multiple/>
                                    <label for="add_material__comment__btn" className="material__btn"><img src={upload} className="group__options__icon"/>Materiais</label>
                                </>
                               ) 
                            }
                        </div>
                        {
                            postEditionMode ? (
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
                            ) : (
                                Object.keys(editableComment).length > 0 && editableComment.files.length > 0 ? 
                                (
                                    <div className='post__files__wrapper'>
                                        {
                                            editableComment.files.length > 0 ?
                                            editableComment.files.map(file => {
                                                return (
                                                <FileButton file={file} edit="true"/>  
                                                )
                                            }) : ''
                                        }
                                    </div>
                                ) : ''
                            )
                        }
                    </form>
                </div>
                {
                    postEditionMode || commentEditionMode ? (
                    <>
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
                {
                    showErrorModal ? (
                    <>
                        <ErrorModal closeModal={closeModal} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
                </Container >  
            </main>
        </>
    )
}
