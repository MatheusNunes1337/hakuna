import React, {useEffect, useState} from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa"
import { RiLock2Fill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {IoClose} from 'react-icons/io5'
import {ImEnter} from 'react-icons/im'

import groupIcon from '../assets/images/group.png'
import lockIcon from '../assets/images/lock.png'
import unlockedIcon from '../assets/images/unlocked.png'
import heartIcon from '../assets/images/lover.png'

import setGroupIcon from '../utils/setGroupIcon';
import api from '../services/api'
import ErrorModal from './ErrorModal';

function Card({id, icon, title, max_members, is_public, favoritos, members, showFavoriteButton, topics, search, description}) {
  let [cardIcon, setIcon] = useState('')
  const [showModal, setModal] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [password, setPassword] = useState('')
  const [reloadComponent, setReloadComponent] = useState(false)
  let [showErrorModal, setErrorModalStatus] = useState(false)
  let [modalMessage, setModalMessage] = useState('')

  const history = useHistory()
  const userToken = localStorage.getItem('userToken')
  const userId =  localStorage.getItem('userId')
  const headers = { Authorization: `Bearer ${userToken}` }

  useEffect(() => {
    setIcon(setGroupIcon(icon))
    setReloadComponent(false)
  }, [reloadComponent])

  useEffect(() => {
    const updateFavorite = async () => {
      try {
        const {data} = await api.get(`groups/${id}`, {headers})
        const {favorites} = data
        setFavorites(favorites)
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
      
    }
    updateFavorite()
  }, [reloadComponent])


  const perfomFavorite = async (e) => {
    e.preventDefault()
    try {
      await api.patch(`groups/${id}/favorite`, {}, {headers})
      setReloadComponent(true)
    } catch(err) {
      handleErrorModal(err.response.data.name)
    }
  }

  const closeModal = () => {
    setModal(false)
  }

  const openModal = () => {
    setModal(true)
  }

  const handleGroup = async (e) => {
    e.preventDefault()

    try {
        const payload = { password }
        await api.patch(`groups/${id}/join`, payload, {headers})
        history.push(`/group/${id}`)
      } catch(err) {
        handleErrorModal(err.response.data.name)
      }
  }

  const closeErrorModal = () => {
    setErrorModalStatus(false)
  }

  const handleErrorModal = (message) => {
      setModalMessage(message)
      setErrorModalStatus(true)
  }

  return (
    search ? (
      <>
      <div className="card" onClick={openModal}>
        <img src={cardIcon} alt="card-image" className="card__image" />
        <div className="card__content">
            <h2 className="card__title">{title}</h2>
            <div className="card__details">
              {
                is_public.toString() === 'false' 
                ? (
                  <span className="card__detail"><img src={lockIcon} className="card__detail__icon" />Privado</span>
                ) 
                : 
                  <span className="card__detail"><img src={unlockedIcon} className="card__detail__icon" />Público</span>
              }    
              <span className="card__detail"><img src={heartIcon} className="card__detail__icon" />{favoritos}</span>
            </div>
          </div>
          {
            showErrorModal ? (
            <>
                <ErrorModal closeModal={closeErrorModal} message={modalMessage} />
                <div className='overlay'></div>
            </>
            ) : ''
          }
      </div>
      {
        showModal && !showErrorModal ? (
          <>
            <div className='group__info__modal'>
              <div className='content__title__wrapper'>
                <img src={cardIcon} alt="card-image" className="title__icon" />
                <h2 className="content__title">{title}</h2>
                <IoClose onClick={closeModal} className='close__edit__modal' />
              </div>
              <div className='modal__body'>
                <p className='modal__body__description'>{description}</p>
                {  topics.map(topic => {
                      return (<span className="group__topic">{topic}</span>)
                  })        
                }
                <div className='group__infos'>
                  <span title='nº máximo de membros' className='group__members'>{`${members}/${max_members}`}</span>
                  <span title='favoritos' className='group__favorites'>{favorites.length}</span>
                  {
                    is_public ? (<span title='privacidade' className='group__privacy public'>público</span>) : 
                    (<span title='privacidade' className='group__privacy private'>privado</span>)
                  }
                </div>
                <form action="" className="enter__group__form" onSubmit={handleGroup}>
               {  !is_public
                  ? (
                    <>
                        <label htmlFor="password" className="form__label">Senha de acesso:</label>
                        <input type="password" className="form__input" onChange={e => setPassword(e.target.value)} />
                    </>    
                  ) 
                  : ''
                }
                  <button className="form__btn"><ImEnter /> Entrar</button>
               </form>
              </div>
            </div>
            <div className='overlay'></div>
          </>
        ) : ''
      }
      </>
    ) : (
      <Link className="card" to={`/group/${id}`}>
        {
          showFavoriteButton ?
          favorites.includes(userId) ? <AiFillHeart title='remover dos favoritos' className='card__favorite heart__fill' onClick={perfomFavorite} /> :
          <AiOutlineHeart title='adicionar aos favoritos' className='card__favorite' onClick={perfomFavorite} /> : ''
        
        }
        <img src={cardIcon} alt="card-image" className="card__image" />
        <div className="card__content">
            <h2 className="card__title">{title}</h2>
          <div className="card__details no__search">
          {
                is_public.toString() === 'false' 
                ? (
                  <span className="card__detail"><img src={lockIcon} className="card__detail__icon" />Privado</span>
                ) 
                : 
                  <span className="card__detail"><img src={unlockedIcon} className="card__detail__icon" />Público</span>
              }    
              <span className="card__detail"><img src={groupIcon} className="card__detail__icon" />{members}/{max_members}</span>
            </div>
          </div>
          {
            showErrorModal ? (
            <>
                <ErrorModal closeModal={closeErrorModal} message={modalMessage} />
                <div className='overlay'></div>
            </>
            ) : ''
          }
    </Link>
    )
  )
}

export default Card