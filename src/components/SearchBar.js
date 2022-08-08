import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import {FaSearch} from 'react-icons/fa'

function SearchBar() {
  const [filter, setFilter] = useState('')
  const [targetType, setTargetType] = useState('grupos')
  const history = useHistory()

  const search = (e) => {
    e.preventDefault()
    
    if(targetType === 'grupos')
      history.push(`/search/groups?query=${filter}`)
    else 
      history.push(`/search/users?query=${filter}`)
  }

  return (
    <>
      <div className="searchbar">
          <select className='searchbar__type__filter' defaultValue="grupos" onChange={e => setTargetType(e.target.value)}>
            <option value="grupos">Grupos</option>
            <option value="usuários">Usuários</option>
          </select>
          <input type="text" className="searchbar__input" onChange={e => setFilter(e.target.value)} placeholder={targetType == 'grupos' ? "Busque um grupo por disciplina ou tópico de estudo" : "Busque usuários pelo nome de usuário"}/>
          <button className="searchbar__btn" onClick={search}><FaSearch className="searchbar__icon"/></button>
      </div>  
    </> 
  )
}

export default SearchBar