import React, {useEffect, useState} from 'react'
import setFileButtonProperties from '../utils/setFileButtonProperties'
import {TiDelete} from 'react-icons/ti'

function FileButton ({file, edit}) {
    let [icon, setIcon] = useState('')
    let [classname, setClassname] = useState('')
    let [filename, setFilename] = useState('')

    useEffect(() => {
        const [filename, extension] = file.split('.')
        setFilename(filename)
        const {icon, classname} = setFileButtonProperties(extension)
        setIcon(icon)
        setClassname(classname)
      }, [])

    const deleteFile = (e) => {
        const {baseVal} = e.currentTarget.className
        const [, fileKey] = baseVal.split(' ')
        console.log('arquivo a ser deletado', fileKey)
    }

    return (
        <button type='button' className={classname + ' ' + file}>{icon}{filename}{edit == 'true' ? <TiDelete className={'delete__material__icon' + ' ' + file} onClick={deleteFile} /> : ''}</button>
    )
}

export default FileButton