import React from 'react'
import { Link } from 'react-router-dom'

import { FaUserAlt } from "react-icons/fa"
import { HiUserGroup } from "react-icons/hi";
import { BsFillChatLeftFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";



function Aside() {
    return (
      <aside className="aside">
          <picture>
            <img src="http://www.thejungleadventure.com/assets/admin/dist/img/logo_admin.png" alt="user_pic" className="sidebar__user" />
          </picture>
          <ul className="sidebar__menu">
            <li className="sidebar__links"><Link to="/home" className="sidebar__link"><FaUserAlt className="sidebar__link__icon"/>Perfil</Link></li>
            <li className="sidebar__links"><Link to="/home" className="sidebar__link"><HiUserGroup className="sidebar__link__icon"/>Grupos</Link></li>
            <li className="sidebar__links"><Link to="/home" className="sidebar__link"><BsFillChatLeftFill className="sidebar__link__icon"/>Conversas</Link></li>
            <li className="sidebar__links"><Link to="/home" className="sidebar__link"><IoNotifications className="sidebar__link__icon"/>Notificações</Link></li>
            <li className="sidebar__links"><Link to="/home" className="sidebar__link"><IoNotifications className="sidebar__link__icon"/>Grupo</Link></li>
          </ul>
      </aside> 
    )
}

export default Aside