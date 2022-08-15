import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory, Redirect } from 'react-router-dom'
import api from '../../services/api'
import download from 'downloadjs'
import {saveAs} from 'file-saver'

import {FaBook} from 'react-icons/fa'
import {MdDownload} from 'react-icons/md'
import {MdOutlineArrowBack} from 'react-icons/md'
import {IoClose} from 'react-icons/io5'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import FileButton from '../../components/FileDownloadButton';
import setFileButtonProperties from '../../utils/setFileButtonProperties';

import book from '../../assets/images/books.png'
import downloadIcon from '../../assets/images/download.png'
import calendar from '../../assets/images/calendar.png'
import clock from '../../assets/images/clock.png'
import uploadIcon from '../../assets/images/upload.png'
import material from '../../assets/images/book.png'

import ErrorModal from '../../components/ErrorModal'
import authenticateMember from '../../utils/authenticateMember'

const getFilename = (file) => {
    const [filename, ext] = file.split('.')
    return filename
}

const getExtension = (file) => {
    const [filename, ext] = file.split('.')
    return ext
}

const getFileIcon = (file) => {
    const [filename, ext] = file.split('.')
    const {icon} = setFileButtonProperties(ext)
    return icon
}

export default function Files() {
    const [files, setFiles] = useState([])
    const [isMod, setMod] = useState(false)
    const [showModal, setModal] = useState(false)
    const [modalTarget, setModalTarget] = useState({})
    const [fileDownloadUrl, setFileDownloadUrl] = useState('')
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')
    let [contentLoaded, setContentLoaded] = useState(false)

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
    const isMember = async () => await authenticateMember(id, userId)
    const history = useHistory()

    useEffect(() => {
        const getFiles = async () => {
          try {
            const {data} = await api.get(`groups/${id}`, {headers})
            const {posts, mods} = data
            const moderators = mods.map(mod => mod._id)
            if(moderators.includes(userId)) setMod(true)
            
            let files_array = []
            posts.forEach(post => {
                post.files.forEach(file => {
                    files_array.push({file: file, creationDate: post.creationDate, creationTime: post.creationTime, author: post.author.username})
                })
                post.comments.forEach(comment => {
                    comment.files.forEach(file => {
                        files_array.push({file: file, creationDate: comment.creationDate, creationTime: comment.creationTime, author: comment.author.username})
                    })
                })
            })
            setFiles(files_array.flat())
            setContentLoaded(true)
          } catch(err) {
            handleErrorModal(err.response.data.error)
          }
        }
        getFiles()
      }, [showModal])

    const downloadFile = async (e) => {
        try {
            const fileKey = e.currentTarget.value
            const {data} = await api.get(`files/download/${fileKey}`, {headers})
            saveAs(data)
        } catch(err) {
            handleErrorModal(err.response.data.name)
        }
    }

    const closeModal = () => {
        setModal(false)
        setModalTarget({})
    }

    const showFileModal = (e) => {
        const file = e.currentTarget.value
        const target = files.filter(arquivo => arquivo.file == file)
        setModalTarget(target[0])
        setModal(true)
    }
    
    const closeErrorModal = () => {
        setErrorModalStatus(false)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setErrorModalStatus(true)
    }

    if(!isMember) {
        return <Redirect to='/home' />
    } else {
        return (
            <>
            <NavBar />
                <main>
                    <Container>
                    <SearchBar />
                    <Aside />
                    <div className="content">
                        <div className='content__title__wrapper'>
                            <Link to={`group/${id}`} className="group__back" title='voltar' ><MdOutlineArrowBack className="back__icon"/></Link>
                            <h2 className="content__title">Materiais <img src={book} className='title__colorful__icon' /></h2>
                        </div>
                        {
                            files.length !== 0 && contentLoaded ? (
                                <div className='files__container'>
                                {
                                    files.map((file, index) => {
                                        return (<button key={index} value={file.file} className='file__item' onClick={showFileModal}>{getFileIcon(file.file)}<span>{getFilename(file.file)}</span></button>)
                                    })
                                }
                                </div>
                                ) : (
                                    !contentLoaded ? <div className="container__null"><div className="loader"></div></div> : 
                                    <div className='empty__files__container'>
                                        <img src={book} className="any__user__icon"/>
                                        <span>Parece que ainda não foi compartilhado nenhum material nesse grupo</span>
                                    </div>
                                )
                        }
                        {
                            showModal ? (
                            <>
                                <div className='file__info__modal'>
                                    <div className='content__title__wrapper'>
                                        <img src={book} alt="card-image" className="card__image" />
                                        <h2 className="content__title">Informações do arquivo</h2>
                                        <IoClose onClick={closeModal} className='close__edit__modal' />
                                    </div>
                                    <div className='modal__body'>
                                        <div className='file__infos'>
                                            <span title='nome do arquivo'><img src={material} alt='material' /> Nome: {getFilename(modalTarget.file)}</span>
                                            <span title='formato do arquivo'>{getFileIcon(modalTarget.file)}Formato: {'.' + getExtension(modalTarget.file)}</span>
                                            <span title='data de criação'><img src={calendar} alt='calendar' /> Data do upload: {modalTarget.creationDate}</span>
                                            <span title='hora de criação'><img src={clock} alt='clock' />Hora do upload: {modalTarget.creationTime}</span>
                                            <span title='feito por'><img src={uploadIcon} alt='upload file' />Upload feito por: {modalTarget.author}</span>
                                        </div>
                                    </div>
                                    <div className='modal__buttons'>
                                        <button onClick={downloadFile} value={modalTarget.file}>Baixar</button>
                                    </div>
                                </div>
                                <div className='overlay'></div>
                            </>
                            ) : ''
                        }  
                    </div>
                    {
                        showErrorModal ? (
                        <>
                            <ErrorModal closeModal={closeErrorModal} message={modalMessage} />
                            <div className='overlay'></div>
                        </>
                        ) : ''
                    }
                    {<a className='iframe__downloader' id='iframe__download' href={fileDownloadUrl} download>oi</a>}
                    </Container >  
                </main>
            </>
        )
    }
    
}
