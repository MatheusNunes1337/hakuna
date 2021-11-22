import React, {useState} from 'react'

import { Link } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa"
import { RiLock2Fill } from "react-icons/ri";
import { BiWorld } from "react-icons/bi"

import matematica from '../assets/images/matematica.png'
import astronomia from '../assets/images/astronomia.png'
import direito from '../assets/images/direito.png'
import programacao from '../assets/images/programacao.png'
import quimica from '../assets/images/quimica.png'
import idiomas from '../assets/images/idiomas.png'



function Card({id, icon, title, max_members, is_public}) {
  let [cardIcon, setIcon] = useState('')
  
  switch(icon) {
    case 'matemática':
      cardIcon = matematica
      break
    case 'astronomia':
      cardIcon = astronomia
      break
    case 'direito':
      cardIcon = direito
      break
    case 'programacao':
      cardIcon = programacao
      break 
    case 'quimica':
      cardIcon = quimica
      break
    case 'idiomas':
      cardIcon = idiomas
      break
    default:
      cardIcon = astronomia
      break            
  }

  return (
    <Link className="card" to={`/group/${id}`}>
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
              <span className="card__detail"><FaUserAlt className="card__detail__icon" />1/{max_members}</span>
            </div>
          </div>
    </Link> 
  )
}

export default Card