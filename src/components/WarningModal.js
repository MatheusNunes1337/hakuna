import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {IoClose} from 'react-icons/io5'

import WarningIcon from '../assets/images/warning.png'

function WarningModal({message, closeModal, cancelOperation, confirm}) {
  

  return (
    <>
      <div className='message__modal'>
            <IoClose onClick={closeModal} className='close__message__modal' />
            <div className='message__modal__header'>
                <img src={WarningIcon} alt='sucess image' className='message__modal__icon' />
                <h2 className='modal__title warning__title'>Atenção</h2>
            </div>
            <div className='modal__message'>
                <p>{message}</p>
                <div className='modal__message__buttons'>
                    <button type='button'>confirmar</button>
                    <button type='button'>cancelar</button>
                </div>
            </div>
        </div>  
    </> 
  )
}

export default WarningModal