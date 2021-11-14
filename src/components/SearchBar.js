import React from 'react'
import { BsSearch } from "react-icons/bs"

function SearchBar() {

    return (
      <>
        <div className="searchbar">
            <input type="text" className="searchbar__input" placeholder="Busque um grupo por disciplina ou nome"/>
            <button className="searchbar__btn"><BsSearch className="searchbar__icon"/></button>
        </div>  
      </> 
    )
}

export default SearchBar