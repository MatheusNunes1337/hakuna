import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

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
import ErrorModal from '../../components/ErrorModal'

const getFilename = (file) => {
    const [filename, ext] = file.split('.')
    return filename
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
    let [showErrorModal, setErrorModalStatus] = useState(false)
    let [modalMessage, setModalMessage] = useState('')

    const { id } = useParams();
    const token = localStorage.getItem('userToken')
    const userId = localStorage.getItem('userId')
    const headers = { Authorization: `Bearer ${token}` }
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
                        files_array.push({file: file, creationDate: comment.creationDate})
                    })
                })
            })
            setFiles(files_array.flat())
          } catch(err) {
            handleErrorModal(err.response.data.error)
          }
        }
        getFiles()
      }, [])

    const downloadFile = async (e) => {
        try {
            const fileKey = e.currentTarget.value
            await api.get(`files/download/${fileKey}`, {headers})
        } catch(err) {
            handleErrorModal(err.response.data.error)
        }
    }

    const closeModal = () => {
        setModal(false)
    }

    const showFileModal = (e) => {
        const file = e.currentTarget.value
        const target = files.find(arquivo => arquivo.file = file)
        setModalTarget(target)
        setModal(true)
    }
    
    const closeErrorModal = () => {
        setErrorModalStatus(false)
    }

    const handleErrorModal = (message) => {
        setModalMessage(message)
        setErrorModalStatus(true)
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
                        <Link to={`group/${id}`} className="group__back" title='voltar' ><MdOutlineArrowBack className="back__icon"/></Link>
                        <h2 className="content__title">Materiais <img src={book} className='title__colorful__icon' /></h2>
                    </div>
                    {
                        files.length !== 0 ? (
                            <div className='files__container'>
                            {
                                files.map((file, index) => {
                                    return (<button key={index} value={file.file} className='file__item' onClick={showFileModal}>{getFileIcon(file.file)}<span>{getFilename(file.file)}</span></button>)
                                })
                            }
                            </div>
                            ) : (
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
                                        <span title='nome do arquivo'>Nome: {getFilename(modalTarget.file)}</span>
                                        <span title='formato do arquivo'>Formato: {getFileIcon(modalTarget.file)}</span>
                                        <span title='data de criação'>Data do upload: {modalTarget.creationDate}</span>
                                        <span title='hora de criação'>Hora do upload: {modalTarget.creationTime}</span>
                                        <span title='feito por'>Upload feito por: {modalTarget.author}</span>
                                    </div>
                                </div>
                                <div className='modal__buttons'>
                                    <button>Baixar</button>
                                    <button>Salvar</button>
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
                </Container >  
            </main>
        </>
    )
}
