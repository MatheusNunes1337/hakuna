import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {IoClose} from 'react-icons/io5'

import EmailIcon from '../assets/images/email.png'

function MailModal({message, closeModal}) {
  

  return (
    <>
      <div className='message__modal'>
            <IoClose onClick={closeModal} className='close__message__modal' />
            <div className='message__modal__header'>
                <img src={EmailIcon} alt='sucess image' className='message__modal__icon' />
                <h2 className='modal__title mail__title'>Quase lá!</h2>
            </div>
            <p className='email__modal__message'>
                {message}
            </p>
        </div>  
    </> 
  )
}

export default MailModal