import React from 'react'

import { GrDocumentTxt } from "react-icons/gr";
import { BsFillFileEarmarkPdfFill, BsFileEarmarkWordFill } from "react-icons/bs";
import { AiFillFileWord, AiFillFilePdf, AiFillFileImage, AiFillFire } from "react-icons/ai";
import { IoLogoJavascript } from "react-icons/io";

const setFileButtonProperties = (fileExtension) => {
    let icon
    let classname
    fileExtension = fileExtension.toLowerCase()

    switch(fileExtension) {
        case 'pdf':
            icon = <AiFillFilePdf className='file__btn__icon'/>
            classname = 'pdf__file'
            break
        case 'docx':
            icon = <AiFillFileWord className='file__btn__icon' />
            classname = 'word__file'
            break
        case 'js':
            icon = <IoLogoJavascript className='file__btn__icon' />
            classname = 'js__file'
            break
        case 'txt':
            icon = <GrDocumentTxt className='file__btn__icon' />
            classname = 'txt__file'
            break
        case 'jpeg':
            icon = <AiFillFileImage className='file__btn__icon' />
            classname = 'img__file'
            break
        case 'jpg':
            icon = <AiFillFileImage className='file__btn__icon' />
            classname = 'img__file'
            break
        case 'png':
            icon = <AiFillFileImage className='file__btn__icon' />
            classname = 'img__file'
            break
        default:
            icon = <AiFillFire className='file__btn__icon' />
            classname = 'img__file'
             break            
    }

    return {icon, classname}
}

export default setFileButtonProperties