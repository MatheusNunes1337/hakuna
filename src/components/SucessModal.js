import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {IoClose} from 'react-icons/io5'

import SucessIcon from '../assets/images/sucess.png'

function SucessModal({message, closeModal}) {
  

  return (
    <>
      <div className='message__modal'>
            <IoClose onClick={closeModal} className='close__message__modal' />
            <div className='message__modal__header'>
                <img src={SucessIcon} alt='sucess image' className='message__modal__icon' />
                <h2 className='modal__title sucess__title'>Sucesso</h2>
            </div>
            <p className='modal__message'>
                {message}
            </p>
        </div>  
    </> 
  )
}

export default SucessModal