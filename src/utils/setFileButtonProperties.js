import React from 'react'

import { GrDocumentTxt } from "react-icons/gr";
import { BsFillFileEarmarkPdfFill, BsFileEarmarkWordFill } from "react-icons/bs";
import { AiFillFileWord, AiFillFilePdf, AiFillFileExcel, AiFillFileImage, AiFillFire } from "react-icons/ai";
import { IoLogoJavascript } from "react-icons/io";

import pdf from '../assets/images/pdf.png'
import word from '../assets/images/word.png'
import excel from '../assets/images/excel.png'
import txt from '../assets/images/txt.png'
import javascript from '../assets/images/javascript.png'
import png from '../assets/images/png.png'
import jpg from '../assets/images/jpg.png'
import jpeg from '../assets/images/jpeg.png'

const setFileButtonProperties = (fileExtension) => {
    let icon
    let classname
    fileExtension = fileExtension.toLowerCase()

    switch(fileExtension) {
        case 'pdf':
            icon = <img src={pdf} className='file__btn__icon'/>
            classname = 'pdf__file'
            break
        case 'docx':
            icon = <img src={word} className='file__btn__icon'/>
            classname = 'word__file'
            break
        case 'xlsx':
            icon = <img src={excel} className='file__btn__icon'/>
            classname = 'excel__file'
            break
        case 'xls':
            icon = <img src={excel} className='file__btn__icon'/>
            classname = 'excel__file'
            break
        case 'js':
            icon = <img src={javascript} className='file__btn__icon'/>
            classname = 'js__file'
            break
        case 'txt':
            icon = <img src={txt} className='file__btn__icon'/>
            classname = 'txt__file'
            break
        case 'jpeg':
            icon = <img src={jpeg} className='file__btn__icon'/>
            classname = 'img__file'
            break
        case 'jpg':
            icon = <img src={jpg} className='file__btn__icon'/>
            classname = 'img__file'
            break
        case 'png':
            icon = <img src={png} className='file__btn__icon'/>
            classname = 'img__file'
            break
        default:
            icon = <img src={pdf} className='file__btn__icon'/>
            classname = 'img__file'
             break            
    }

    return {icon, classname}
}

export default setFileButtonProperties