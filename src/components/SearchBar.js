import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"

function SearchBar() {
  const [filter, setFilter] = useState('')
  const [targetType, setTargetType] = useState('grupos')
  const history = useHistory()

  const search = (e) => {
    e.preventDefault()
    history.push(`/search?query=${filter}`)
  }

  return (
    <>
      <div className="searchbar">
          <select className='searchbar__type__filter' onChange={e => setTargetType(e.target.value)}>
            <option value="grupos" selected="selected">Grupos</option>
            <option value="usuários">Usuários</option>
          </select>
          <input type="text" className="searchbar__input" onChange={e => setFilter(e.target.value)} placeholder={targetType == 'grupos' ? "Busque um grupo por disciplina ou tópico de estudo" : "Busque usuários pelo nome de usuário"}/>
          <button className="searchbar__btn" onClick={search}><BsSearch className="searchbar__icon"/></button>
      </div>  
    </> 
  )
}

export default SearchBar