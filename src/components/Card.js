import React, {useEffect, useState} from 'react'

import { Link } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa"
import { RiLock2Fill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import setGroupIcon from '../utils/setGroupIcon';

function Card({id, icon, title, max_members, is_public, members, search, cardType}) {
  let [cardIcon, setIcon] = useState('')
  //let [isGroupFavorited, setGroupFavorite] = useState(false)
  //let [favoriteIcon, setFavoriteIcon] = useState(<AiOutlineHeart className="card__detail__icon" onClick={performFavoriteGroup}/>)
  useEffect(() => {
    setIcon(setGroupIcon(icon))
  }, [])

  /*
  const performFavoriteGroup = () => {
    if(isGroupFavorited) {
      setGroupFavorite(false)
      setFavoriteIcon(<AiOutlineHeart className="card__detail__icon" onClick={performFavoriteGroup}/>)
    } else {
      setGroupFavorite(true)
      setFavoriteIcon(<AiFillHeart className="card__detail__icon" onClick={performFavoriteGroup}/>)
    }
  }
  */
  
  return (
    <Link className="card" to={!search ? `/group/${id}` : `/group-info/${id}`}>
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
}

export default Card