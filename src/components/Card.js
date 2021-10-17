import React from 'react'

import { Link } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa"
import { RiLock2Fill } from "react-icons/ri";
import { MdPublic } from "react-icons/md";



function Card(props) {

    return (
      <Link className="card" to="/home">
          <img src="https://www.freeiconspng.com/uploads/whatsapp-icon-png-4.png" alt="card-image" className="card__image" />
          <div className="card__content">
              <h2 className="card__title">Grupo de astronomia</h2>
              <div className="card__details">
                <span className="card__detail"><RiLock2Fill className="card__detail__icon" />Privado</span>
                <span className="card__detail"><FaUserAlt className="card__detail__icon" />1/99</span>
              </div>
            </div>
      </Link> 
    )
}

export default Card