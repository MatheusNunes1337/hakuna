import React, {useState, useEffect } from 'react'
import { Link, useParams, useHistory, Redirect } from 'react-router-dom'
import api from '../../services/api'

import { HiLogout, HiUsers, HiUserGroup } from "react-icons/hi"
import { BsFillCameraVideoFill, BsFillGearFill, BsThreeDots, BsDot, BsFillXCircleFill, BsThreeDotsVertical } from "react-icons/bs";
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
import solvedIcon from '../../assets/images/solved.png'
import upload from '../../assets/images/upload.png'
import sucess from '../../assets/images/sucess.png'
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
import flagIcon from '../../assets/images/flag.png'
import questionIcon from '../../assets/images/question.png'
import cancelIcon from '../../assets/images/cancel.png'
import requestHelp from '../../assets/images/request_help.png'
import requestIcon from '../../assets/images/request.png'
import postIcon from '../../assets/images/post.png'
import setGroupIcon from '../../utils/setGroupIcon';
import ErrorModal from '../../components/ErrorModal';
import SucessModal from '../../components/SucessModal';
import WarningModal from '../../components/WarningModal';
import ProfileModal from '../../components/ProfileModal';
import badWordCatcher from '../../utils/badWordCatcher';
import authenticateMember from '../../utils/authenticateMember';


export default function Feed() {
    const [posts, setPosts] = useState([])
    const [groupName, setGroupName] = useState('')
    const [discipline, setDiscipline] = useState('')
    const [modsIdList, setModsIdLIst] = useState([])
    const [membersIdList, setMembersIdLIst] = useState([])
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
    const [showSearchInput, setSearchInputVisibility] = useState(true) 
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
    let [showProfileModal, setProfileModalStatus] = useState(false)
    let [targetUser, setTargetUser] = useState('')
    let [contentLoaded, setContentLoaded] = useState(false)
    const [postFilter, setPostFilter] = useState('todas')
    const [showHelpRequestModal, setHelpRequestModal] = useState(false)
    let [helpRequestContent, setHelpRequestContent] = useState('')
    let [currentUserPic, setCurrentUserPic] = useState('')
    let [commentInputTargetId, setCommentInputTargetId] = useState('')
    let [commentListTargetId, setCommentListTargetId] = useState('')
    let [commentOptionsMenuTargetId, setCommentOptionsMenuTargetId] = useState('')
    let [postOptionsMenuTargetId, setPostOptionsMenuTargetId] = useState('')
    let [showGroupOptionsMenu, setGroupOptionsMenuStatus] = useState(false)
    //let [canAccess, setMemberAuthentication] = useState(false)

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const isMember = async () => await authenticateMember(id, userId)
    const history = useHistory()

    useEffect(() => {
        const getMods = async () => {
          try {
            const {data} = await api.get(`groups/${id}`, {headers})
            const {mods, name, posts, discipline, members} = data
            const currentUser = members.find(member => member._id == userId)
            setCurrentUserPic(currentUser.profilePic)
            const moderators = mods.map(mod => mod._id)
            const membersId = members.map(member => member._id)
            setModsIdLIst(moderators)
            setMembersIdLIst(membersId)
            if(moderators.includes(userId)) setMod(true)
            setGroupName(name)
            setDiscipline(discipline)

            if(postFilter === 'minhas') {
                const filteredPosts = posts.filter(post => post.author._id == userId)
                setPosts(filteredPosts.reverse())
            } else if (postFilter === 'duvidas') {
                const filteredPosts = posts.filter(post => post.isHelpRequired == true)
                setPosts(filteredPosts.reverse())
            } else {
                setPosts(posts.reverse()) 
            }
            setReloadComponents(false)
            setContentLoaded(true)
          } catch(err) {
            handleErrorModal(err.response.data.name)
          }
        }
        getMods()
      }, [reloadComponents, searchModeOn, postFilter])

    const getScreenWidth = () => window.screen.availWidth
        
    useEffect(() => {
        setScreenWidth(getScreenWidth)
    }, [screenWidth])

    const handlePost = async (e) => {
        e.preventDefault()

        if(content.length == 0) {
            handleErrorModal('O conteúdo da postagem não pode ser nulo')
            return 
        } else if(content.length > 2000) {
            handleErrorModal('O conteúdo da postagem deve conter no máximo 2000 caracteres')
            return 
        }

        if(Array.from(files).length > 3) {
            handleErrorModal('você pode anexar no máximo três materiais por postagem')
            return 
        }

        const badWordsCount =  badWordCatcher(content)
        if(badWordsCount > 0) {
            handleErrorModal('Não são permitidas palavras impróprias no conteúdo de uma postagem')
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
                setFiles([])
                setContent('')
            } catch(err) {
                if(!Array.isArray(err.response.data))
                    handleErrorModal(err.response.data.name)
                else 
                    handleErrorModal(err.response.data[0].name)
            }
        } else {
            try {
                await api.patch(`groups/${id}/posts/${editablePost._id}`, formData, {headers})
                handleSucessModal('Postagem editada com sucesso')
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
            const isOperationConfirmed =  window.confirm('Você tem certeza que deseja deixar esse grupo? Você não terá acesso as postagens e materiais')
            if(isOperationConfirmed) {
                await api.patch(`groups/${id}/quit`, {}, {headers})
                history.push('/home')
            }
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }
    }

    const handleCommentInput = (e) => {
        setCommentInputTargetId(e.currentTarget.value)
        if(showCommentInput) {
            setCommentInput(false)
            setCommentInputTargetId('')
            //setCommentIcon(<FaRegCommentAlt />)
        } else {
            setCommentInput(true)
            setPostFilesList(false)
            //setCommentIcon(<FaCommentAlt />)
        }
    }

    const handleCommentList = (e) => {
        setCommentListTargetId(e.currentTarget.value)
        if(showCommentList) {
            setCommentList(false)
            setCommentListTargetId('')
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
        setPostOptionsMenuTargetId(e.currentTarget.value)
        if(showPostOptionsMenu) {
            setPostOptionsMenu(false)
            setPostOptionsMenuTargetId('')
        } else {
            setPostOptionsMenu(true)
        }
    }

    const handleCommentOptionsMenu = (e) => {
        setCommentOptionsMenuTargetId(e.currentTarget.value)
        if(showCommentOptionsMenu) {
            setCommentOptionsMenu(false)
            setCommentOptionsMenuTargetId('')
        } else {
            setCommentOptionsMenu(true)
        }
    }

    const createComment = async (postId) => {
        if(commentContent.length == 0) {
            handleErrorModal('O conteúdo do comentário não pode ser nulo')
            return 
            
        } else if(commentContent.length > 300) {
            handleErrorModal('O conteúdo do comentário deve conter no máximo 300 caracteres')
            return 
        } else if(Array.from(commentFiles).length > 3) {
            handleErrorModal('Você pode anexar no máximo três materiais por comentário')
            return
        }

        const badWordsCount =  badWordCatcher(commentContent)
        if(badWordsCount > 0) {
            handleErrorModal('Não são permitidas palavras impróprias no conteúdo de um comentário.')
            return
        }

        try {
            const formData = new FormData()
            formData.append('content', commentContent)
           
                Array.from(commentFiles).forEach(file => {
                    formData.append('files', file)
                })
            

            const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}
            if(!commentEditionMode) {
                await api.post(`groups/${id}/posts/${postId}/comments`, formData, {headers})
                handleSucessModal('Comentário criado com sucesso')
                setCommentFiles([])
                setCommentContent('')
                const input = document.getElementsByClassName(postId)[0]
                input.value = ''
            } else {
                const [postId, commentId] = editCommentIds
                await api.patch(`groups/${id}/posts/${postId}/comments/${commentId}`, formData, {headers})
                handleSucessModal('Comentário editado com sucesso')
                setCommentFiles([])
                setCommentContent('')
                setCommentEditionMode(false)
            }
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
            const isOperationConfirmed = window.confirm('Você tem certeza que deseja excluir essa postagem?')
            if(isOperationConfirmed) {
                await api.delete(`groups/${id}/posts/${postId}/`, {headers})
                handleSucessModal('Postagem excluída com sucesso.')
                setReloadComponents(true)   
            }
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }
    }

    const deleteComment = async(e) => {
        const [commentId, postId] = e.target.className.split(' ')
        try {
            const isOperationConfirmed = window.confirm('Você tem certeza que deseja excluir esse comentário?')
            if(isOperationConfirmed) {
                await api.delete(`groups/${id}/posts/${postId}/comments/${commentId}`, {headers})
                handleSucessModal('Comentário excluído com sucesso')
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
        setContentLoaded(false)

        try {
            const {data} = await api.get(`groups/${id}/posts?content=${filter}`, {headers})
            const {posts} = data
            setPosts(posts)
            setContentLoaded(true)
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
        setContentLoaded(false)
    }

    const goToProfile = (e) => {
        const [, id] = e.currentTarget.className.split(' ')
        history.push(`/${id}`)
    }

    const enablePostEditionMode = async (e) => {
        const postId = e.currentTarget.className
        try {
            const {data} = await api.get(`groups/${id}/posts/${postId}`, {headers})
            const {content, files} = data
            const input = document.getElementsByClassName('form__textarea')[1]
            input.innerHTML = content
            setContent(content)
            setEditablePost(data)
            setPostEditionMode(true)
            setCommentEditionMode(false)
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
        try {
            const {data} = await api.get(`groups/${id}/posts/${postId}/comments/${commentId}`, {headers})
            const {content, files} = data
            const input = document.getElementsByClassName('form__textarea')[1]
            input.innerHTML = content
            setCommentContent(content)
            setEditableComment(data)
            setCommentEditionMode(true)
            setPostEditionMode(false)
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

      const handleProfileModal = (e) => {
        const [, id] = e.currentTarget.className.split(' ')
        setTargetUser(id)
        setProfileModalStatus(true)
      }

      const closeProfileModal = () => {
        setProfileModalStatus(false)
      }

      const helpRequest = async (e) => {
        const postId = e.currentTarget.className
        const data = { postId }
        const formData = new FormData()
        formData.append('isHelpRequired', true)
        
        try {
            const confirm = window.confirm('Ao solicitar ajuda, os professores da área não poderão ter acesso aos materiais compartilhados na sua postagem. Deseja continuar mesmo assim?')
            if(!confirm) return 
            await api.post(`help-requests`, data, {headers})
            await api.patch(`groups/${id}/posts/${postId}`, formData, {headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}})
            handleSucessModal('Sua dúvida foi enviada a todos os professores da área, sendo sujeita a ser respondida tanto por eles como pelos membros do grupo')
            setPostOptionsMenu(false)
            setReloadComponents(true)
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }

      }
      const openHelpRequestModal = () => {
        setHelpRequestModal(true)
      }

      const closeHelpRequestModal = () => {
        setHelpRequestModal(false)
      }

      const cancelHelpRequest = async (e) => {
        const postId = e.currentTarget.className
        const data = { postId }
        const formData = new FormData()
        formData.append('isHelpRequired', false)
        
        try {
            const confirm = window.confirm('Tem certeza que deseja cancelar a solicitação de ajuda?')
            if(!confirm) return 
            await api.patch(`help-requests/${postId}`, {}, {headers})
            await api.patch(`groups/${id}/posts/${postId}`, formData, {headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}})
            handleSucessModal('Solicitação de ajuda cancelada com sucesso')
            setPostOptionsMenu(false)
            setReloadComponents(true)
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }

      }

      const resolveQuestion = async (e) => {
        const [commentId, postId, authorId] = e.target.className.split(' ')

        const formData = new FormData()
        formData.append('resolvedBy', commentId)
        formData.append('author', authorId)
        formData.append('isHelpRequired', false)
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}

        try {
            const confirm = window.confirm('Sua dúvida foi realmente solucionada?')
            if(!confirm) return
            await api.patch(`groups/${id}/posts/${postId}`, formData, {headers})
            handleSucessModal('Sua dúvida foi dada como solucionada')
            setReloadComponents(true)
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }

      }

      const handleGroupOptionsMenu = () => {
        if(showGroupOptionsMenu) {
            setGroupOptionsMenuStatus(false)
        } else {
            setGroupOptionsMenuStatus(true)
        }
      }

      const handleFilter = (e) => {
        if(e.key === 'Enter') {
            searchPost(e)
        }
      }

    if(!isMember) {
        return <Redirect to="/home" />
    }

    return (
        <>
        <NavBar />
            <main>
                <Container>
                <SearchBar />
                <Aside />
                <div className="content">
                    <div className='content__title__wrapper feed'>
                        <h2 className="content__title"><img src={setGroupIcon(discipline)} className='title__colorful__icon' />{groupName}</h2>
                        <BsThreeDots className='dots__icon' onClick={handleGroupOptionsMenu} />
                        {
                            showGroupOptionsMenu ? 
                            <ul className='group__options__menu'>
                                <li><Link to={`/group/${id}/members`} className="group__options__link"><img src={group} className="group__options__icon"/>Membros</Link></li>
                                <li><Link to={`/group/${id}/files`} className="group__options__link"><img src={book} className="group__options__icon"/>Materiais</Link></li>
                                {!isMod ? '' : <li><Link to={`/group/${id}/config`} className="group__options__link"><img src={settings} className="group__options__icon"/>Configurações</Link></li>}
                                <li><button className="group__options__btn" onClick={quitGroup}><img src={leave} className="group__options__icon"/>Sair</button></li>
                            </ul> : ''
                        }
                    </div>
                    {
                        showSearchInput ? (
                            <>
                                <div className="feed_searchbar">
                                    <input type="text" className="search__post__input" onKeyDown={handleFilter} onChange={e => setFilter(e.target.value)} placeholder="Busque uma postagem por palavra-chave"/>
                                    <button className="searchbar__btn" onClick={searchPost}><FaSearch className="searchbar__icon"/></button>
                                </div>
                                {filterButtonVisibility ? <button className='filter__btn'>{filter}<MdClose onClick={removeFilter}/></button> : ''}
                            </>
                        ) : ''
                    }
                    <form action="" className="post__form">
                        <textarea name="description" className="form__textarea" id="group__description" cols="30" rows="7" placeholder='Compartilhe algo com os seus colegas' onChange={e => setContent(e.target.value)}></textarea>
                        {files.length > 0 && !postEditionMode ? <p className='file__status'><img src={sucess} alt='sucess icon' /> materiais selecionados</p> : ''}
                        <div className='post__btn__wrapper'> 
                            <button className="form__btn" onClick={handlePost}>Postar</button>
                            <input type="file" id="add_material__btn" name='files' onChange={e => setFiles(e.target.files)} multiple/>
                            <label for="add_material__btn" className="material__btn"><img src={upload} className="group__options__icon"/>Materiais</label>
                        </div>
                    </form>
                    <div className='post__filter__wrapper'>
                        <select className='post__filter' defaultValue="todos" onChange={e => setPostFilter(e.target.value)}>
                            <option title='mostrar todas as postagens' value="todas">todas</option>
                            <option title='mostrar postagens criadas por mim' value="minhas">minhas</option>
                            <option title='mostrar todas as duvidas' value="duvidas">duvidas</option>
                        </select>
                    </div>
                    <div className="group__posts">
                    {  posts.length !== 0 ?
                       posts.map((post, index) => {
                           return (
                            <>
                            <div className='post__item' key={index}>
                                {
                                    showPostOptionsMenu && postOptionsMenuTargetId == post._id ? 
                                    post.author._id === userId ? (
                                            <ul className='post__options__menu'>
                                                <li onClick={enablePostEditionMode} className={post._id}><img src={editPost} className='post__options__menu__icon' />Editar postagem</li>
                                                <li onClick={deletePost} className={post._id}><img src={deleteIcon} className='post__options__menu__icon' />Deletar postagem</li>
                                                {post.isHelpRequired ? <li onClick={cancelHelpRequest} className={post._id}><img src={cancelIcon} className='post__options__menu__icon' />Cancelar solicitação de ajuda</li> : !post.hasOwnProperty('resolvedBy') ? <li onClick={helpRequest} className={post._id}><img src={requestIcon} className='post__options__menu__icon' />Solicitar ajuda</li> : ''}
                                            </ul>
                                        ) : (
                                            <ul className='post__options__menu'>
                                                <li onClick={deletePost} className={post._id}><img src={deleteIcon} className='post__options__menu__icon' />Deletar postagem</li>
                                            </ul>
                                        )
                                     : '' 
                                }
                                <img src={`https://hakuna-1337.s3.amazonaws.com/${post.author.profilePic}`} className={`post__author__img ${post.author._id}`} style={post.author.type === 'teacher' ? {border: '2px solid lightgreen'} : {border: '2px solid #3799CE'}} onClick={handleProfileModal}/>
                                <div className='post__infos'>
                                    <span className={modsIdList.includes(post.author._id) ? `post__author__name is__mod ${post.author._id}` : `post__author__name ${post.author._id}`}>{post.author.username} {post.isHelpRequired ? <img src={flagIcon} className='flag__icon' /> : ''}</span>
                                    {post.author.type === 'teacher' ? <span className='post__author__title'>Professor de {post.author.area}</span> : ''}
                                    <span className={post.updated ? 'post__creation_time updated__content' : 'post__creation_time'}>{post.creationDate}<BsDot />{post.creationTime}</span>
                                </div>
                                {post.author._id == userId || isMod ? <button onClick={handlePostOptionsMenu} value={post._id} className='post__options__btn'><BsThreeDots /></button> : ''}
                                <p className='post__content'>
                                    {post.content}
                                </p>
                                {post.comments.length > 0 ? <button onClick={handleCommentList} value={post._id} className="handleComments__btn">{post.comments.length > 1 ? `${post.comments.length} comentários` : `${post.comments.length} comentário`}</button> : ''}
                                <hr />
                                <div className='post__action__btns'>
                                    {
                                        screenWidth > 200 ? (
                                            <>
                                                <button className={post.author._id == userId ? 'is__disabled' : ''} disabled={post.author._id == userId} onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <img src={like} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons"/> : <img src={like_outline} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons" />}{post.likes.length}</button>
                                                <button  className={post.author._id == userId ? 'is__disabled' : ''} disabled={post.author._id == userId} onClick={performPostDeslike} value={post._id}>{post.deslikes.includes(userId) ? <img src={dislike} style={{marginTop: '3px'}} className="post__reaction__icons"/> : <img src={dislike_outline} style={{marginTop: '3px'}} className="post__reaction__icons" /> }{post.deslikes.length}</button>
                                                <button onClick={handleCommentInput} value={post._id} ><img src={comment} style={{width: '22px', height: '22px'}} className="post__reaction__icons"/>Comentar</button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}><img src={book} className="post__reaction__icons" />Materiais</button> : ''}
                                            </>
                                        ) : (
                                            <>
                                                <button className={post.author._id == userId ? 'is__disabled' : ''} disabled={post.author._id == userId} onClick={performPostLike} value={post._id}>{post.likes.includes(userId) ? <img src={like} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons"/> : <img src={like_outline} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons" />}{post.likes.length}</button>
                                                <button className={post.author._id == userId ? 'is__disabled' : ''} disabled={post.author._id == userId} onClick={performPostDeslike} value={post._id}>{post.deslikes.includes(userId) ? <img src={dislike} style={{marginTop: '3px'}} className="post__reaction__icons"/> : <img src={dislike_outline} style={{marginTop: '3px'}} className="post__reaction__icons" /> }{post.deslikes.length}</button>
                                                <button onClick={handleCommentInput} value={post._id} ><img src={comment} style={{width: '22px', height: '22px'}} className="post__reaction__icons"/></button>
                                                {post.files.length > 0 ? <button onClick={handlePostFilesSection} value={post._id}><img src={book} className="post__reaction__icons" /></button> : ''}
                                            </>
                                        )
                                    }
                                </div>
                                {
                                    showCommentInput && commentInputTargetId == post._id? (
                                        <>
                                        <div className='post__comment__input'>
                                            <img src={`https://hakuna-1337.s3.amazonaws.com/${currentUserPic}`} style={post.author.type == 'teacher' ? {border: '2px solid lightgreen'} : {border: '2px solid #3799CE'}} className='post__author__img'/>
                                            <input type="text" placeholder='adicionar comentário' className={post._id} onKeyDown={submitComment} onChange={e => setCommentContent(e.target.value)}/>
                                            <input type="file" id="add_material__comment__btn" onChange={e => setCommentFiles(e.target.files)} name='files' multiple/>
                                            <label for="add_material__comment__btn" className=""><img src={addMaterial} className="material__comment__icon"/></label>
                                        </div>
                                        {commentFiles.length > 0 && !commentEditionMode ? <p className='comment__file__status'><img src={sucess} alt='sucess icon' /> materiais selecionados</p> : ''}
                                        </>
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
                                    showCommentList && commentListTargetId == post._id ? (
                                        <div className='comment__container'>
                                            {
                                                post.comments.map(comment => {
                                                    return (
                                                        <div className="comment__item">
                                                            <img src={`https://hakuna-1337.s3.amazonaws.com/${comment.author.profilePic}`} style={comment.author.type === 'teacher' ? {border: '2px solid lightgreen'} : {border: '2px solid #3799CE'}} className={`post__author__img ${comment.author._id}`} onClick={handleProfileModal}/>
                                                            <div className='comment_body'>
                                                            {
                                                                showCommentOptionsMenu && commentOptionsMenuTargetId == comment._id ? (
                                                                    <ul className='comment__options__menu'>
                                                                        {comment.author._id == userId ? <li onClick={enableCommentEditionMode} className={comment._id + ' ' + comment.post}><img src={editComment} className='comment__options__menu__icon' />Editar comentário</li> : ''}
                                                                        {comment.author._id == userId || isMod ? <li onClick={deleteComment} className={comment._id + ' ' + comment.post}><img src={deleteIcon} className='comment__options__menu__icon' />Deletar comentário</li> : ''}
                                                                        {
                                                                            post.author._id == userId && post.isHelpRequired == true &&  comment.author._id !== userId ? 
                                                                            <li onClick={resolveQuestion} className={comment._id + ' ' + comment.post + ' ' + comment.author._id}><img src={solvedIcon} className='comment__options__menu__icon' />Solucionou minha dúvida</li> : ''
                                                                        }
                                                                    </ul>
                                                                ) : ''
                                                            }
                                                                <div className='comment__infos'>
                                                                    <span className={!membersIdList.includes(comment.author._id) ? 'comment__author__name not__member' : 'comment__author__name'}>{comment.author.username}{comment._id == post.resolvedBy ? <span className='best__answer'>solução</span> : ''}</span>
                                                                    {comment.author.type == 'teacher'? <span className='comment__author__title'>Professor de {comment.author.area}</span> : ''}
                                                                    <span className={comment.updated ? 'comment__creation_time updated__content' : 'comment__creation_time'}>{comment.creationDate}<BsDot />{comment.creationTime}</span>
                                                                </div>
                                                                {comment.author._id == userId || isMod || (post.author._id == userId && post.isHelpRequired == true) ? <button className='comment__options__btn' value={comment._id} onClick={handleCommentOptionsMenu}><BsThreeDots /></button> : ''}
                                                                <p className='comment__content'>
                                                                    {comment.content}
                                                                </p>
                                                            </div>
                                                            <div className='comment__action__btns'>
                                                                <button disabled={comment.author._id == userId} onClick={performCommentLike} className={comment._id + ' ' + comment.post}>{comment.likes.includes(userId) ? <img src={like} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons"/> : <img src={like_outline} style={{marginTop: '-5px', height: '20px', width: '20px'}} className="post__reaction__icons" />}{comment.likes.length}</button>
                                                                <button disabled={comment.author._id == userId} onClick={performCommentDeslike} className={comment._id + ' ' + comment.post}>{post.deslikes.includes(userId) ? <img src={dislike} style={{marginTop: '3px'}} className="post__reaction__icons"/> : <img src={dislike_outline} style={{marginTop: '3px'}} className="post__reaction__icons" />}{comment.deslikes.length}</button>
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
                                !contentLoaded ? <div className="loader"></div> :
                                postFilter !== 'duvidas' ? 
                                <>
                                    <img src={postIcon} className="any__user__icon"/>
                                    <p className="group__feed__message">Nenhuma publicação foi realizada ainda</p>
                                </> :
                                <>
                                    <img src={requestIcon} className="any__user__icon"/>
                                    <p className="group__feed__message">Nenhuma ajuda foi solicitada ainda</p>
                                </> 
                            ) : (
                                !contentLoaded ? <div className="loader"></div> :
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
                            <textarea name="description" className="form__textarea" value={content} id="group__description" cols="30" rows="7" onChange={e => setContent(e.target.value)}></textarea> :
                            <textarea name="description" className="form__textarea" value={commentContent} id="group__description" cols="30" rows="7" onChange={e => setCommentContent(e.target.value)}></textarea>
                        }
                        {files.length > 0 || commentFiles.length > 0 ? <p className='file__status'><img src={sucess} alt='sucess icon' /> materiais selecionados</p> : ''}
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
                    postEditionMode || commentEditionMode || showHelpRequestModal ? (
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
                {
                    showSucessModal ? (
                    <>
                        <SucessModal closeModal={closeModal} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
                {
                    showWarningModal ? (
                    <>
                        <WarningModal closeModal={closeModal} cancelOperation={closeModal} confirmOperation={confirmOperation} message={modalMessage} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
                {
                    showProfileModal ? (
                    <>
                        <ProfileModal closeModal={closeProfileModal} targetId={targetUser} />
                        <div className='overlay'></div>
                    </>
                    ) : ''
                }
                </Container >  
            </main>
        </>
    )
}
