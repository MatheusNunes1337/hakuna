import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"

function SearchBar() {
  const [filter, setFilter] = useState('')
  const history = useHistory()

  const search = (e) => {
    e.preventDefault()
    history.push(`/search?query=${filter}`)
  }

  return (
    <>
      <div className="searchbar">
          <input type="text" className="searchbar__input" onChange={e => setFilter(e.target.value)} placeholder="Busque um grupo por disciplina ou nome"/>
          <button className="searchbar__btn" onClick={search}><BsSearch className="searchbar__icon"/></button>
      </div>  
    </> 
  )
}

export default SearchBar