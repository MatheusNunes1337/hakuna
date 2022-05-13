import React, {useEffect, useState} from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa"
import { RiLock2Fill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {IoClose} from 'react-icons/io5'
import {ImEnter} from 'react-icons/im'


import setGroupIcon from '../utils/setGroupIcon';
import api from '../services/api'

function Card({id, icon, title, max_members, is_public, members, showFavoriteButton, topics, search, description}) {
  let [cardIcon, setIcon] = useState('')
  const [showModal, setModal] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [password, setPassword] = useState('')
  const [reloadComponent, setReloadComponent] = useState(false)

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
      const {data} = await api.get(`groups/${id}`, {headers})
      const {favorites} = data
      setFavorites(favorites)
      
    }
    updateFavorite()
  }, [reloadComponent])


  const perfomFavorite = async (e) => {
    e.preventDefault()
    try {
      await api.patch(`groups/${id}/favorite`, {}, {headers})
      setReloadComponent(true)
    } catch(err) {
      alert(err.response.data.name)
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
        alert(err.response.data.name)
      }
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
                  <span className="card__detail"><RiLock2Fill className="card__detail__icon" />Privado</span>
                ) 
                : 
                  <span className="card__detail"><BiWorld className="card__detail__icon" />Público</span>
              }    
              <span className="card__detail"><FaUserAlt className="card__detail__icon" />{members}/{max_members}</span>
            </div>
          </div>
      </div>
      {
        showModal ? (
          <>
            <div className='group__info__modal'>
              <div className='content__title__wrapper'>
                <img src={cardIcon} alt="card-image" className="card__image" />
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
          <div className="card__details">
                {
                is_public.toString() === 'false' 
                ? (
                  <span className="card__detail"><RiLock2Fill className="card__detail__icon" />Privado</span>
                ) 
                : 
                  <span className="card__detail"><BiWorld className="card__detail__icon" />Público</span>
              }    
              <span className="card__detail"><FaUserAlt className="card__detail__icon" />{members}/{max_members}</span>
            </div>
          </div>
    </Link>
    )
  )
}

export default Card