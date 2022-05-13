import React, {useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import {FaBook} from 'react-icons/fa'
import {MdDownload} from 'react-icons/md'
import {MdOutlineArrowBack} from 'react-icons/md'

import NavBar from '../../components/NavBar'
import Container from '../../components/Container'
import Aside from '../../components/Aside'
import SearchBar from '../../components/SearchBar'
import FileButton from '../../components/FileDownloadButton';
import setFileButtonProperties from '../../utils/setFileButtonProperties';

import book from '../../assets/images/books.png'
import downloadIcon from '../../assets/images/download.png'

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
                    files_array.push({file: file, creationDate: post.creationDate})
                })
                post.comments.forEach(comment => {
                    comment.files.forEach(file => {
                        files_array.push({file: file, creationDate: comment.creationDate})
                    })
                })
            })
            setFiles(files_array.flat())
          } catch(err) {
            alert(err)
          }
        }
        getFiles()
      }, [])

    const downloadFile = async (e) => {
        try {
            const fileKey = e.currentTarget.value
            await api.get(`files/download/${fileKey}`, {headers})
        } catch(err) {
            alert(err.response.data.error)
        }
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

    const showFileModal = () => {
       alert('olá')
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
                        files.length == 0 ? (
                            <div className='files__container'>
                               <button className='file__item' onClick={showFileModal}><img src={book} /><span>hakuna20220513_whcnc</span></button>
                               <button className='file__item'>bom dia</button>
                               <button className='file__item'>bom dia</button>
                               <button className='file__item'>bom dia</button>
                               <button className='file__item'>bom dia</button>
                               <button className='file__item'>bom dia</button>
                               <button className='file__item'>bom dia</button> 
                            </div>
                            ) : (
                                <div className='empty__files__container'>
                                    <img src={book} className="any__user__icon"/>
                                    <span>Parece que ainda não foi compartilhado nenhum material nesse grupo</span>
                                </div>
                            )
                    }
                    
                </div>
                </Container >  
            </main>
        </>
    )
}
