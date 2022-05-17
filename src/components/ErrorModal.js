import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {IoClose} from 'react-icons/io5'

import errorIcon from '../assets/images/error.png'

function ErrorModal({message, closeModal}) {
  

  return (
    <>
      <div className='message__modal'>
            <IoClose onClick={closeModal} className='close__message__modal' />
            <div className='message__modal__header'>
                <img src={errorIcon} alt='error image' className='message__modal__icon' />
                <h2 className='modal__title error__title'>Erro</h2>
            </div>
            <p className='modal__message'>
                {message}
            </p>
        </div>  
    </> 
  )
}

export default ErrorModal