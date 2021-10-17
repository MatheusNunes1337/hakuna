import React from 'react'

import {Link} from 'react-router-dom'

function Card(props) {

    function oi(e) {
        e.preventDefault();
        alert('oie')
    }

    return (
      <Link className="card" to="/home" onClick={oi}>
          <img src="https://www.freeiconspng.com/uploads/whatsapp-icon-png-4.png" alt="card-image" className="card__image" />
          <div className="card__content">
              <h2 className="card__title">Grupo de astronomia</h2>
              <span className="card__topics">Galáxias</span>
              <span className="card__topics">Planetas</span>
              <span className="card__topics">Supernovas</span>
            </div>
      </Link> 
    )
}

export default Card