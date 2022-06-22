import React, {useEffect, useState} from 'react'
import setFileButtonProperties from '../utils/setFileButtonProperties'
import {TiDelete} from 'react-icons/ti'
import {saveAs} from 'file-saver'

import api from '../services/api'

function FileButton ({file, edit}) {
    let [icon, setIcon] = useState('')
    let [classname, setClassname] = useState('')
    let [filename, setFilename] = useState('')

    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
        const [filename, extension] = file.split('.')
        setFilename(filename)
        const {icon, classname} = setFileButtonProperties(extension)
        setIcon(icon)
        setClassname(classname)
      }, [])

    const deleteFile = async (e) => {
        const {baseVal} = e.currentTarget.className
        const [, fileKey] = baseVal.split(' ')
        try {
            const confirm = window.confirm('Are you sure you want to remove this file permanently?')
            if(confirm) {
                await api.delete(`files/${file}`, {headers})
                const fileButton = document.getElementsByClassName(classname + ' ' + file)[0]
                fileButton.style.display = 'none'
                alert('arquivo deletado com sucesso')
            }
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    const downloadFile = async () => {
        try {
            const fileKey = file
            const {data} = await api.get(`files/download/${fileKey}`, {headers})
            saveAs(data)
        } catch(err) {
            alert(err.response.data.name)
        }
    }

    return (
        <button type='button' onClick={edit !== 'true' ? downloadFile : ''} className={classname + ' ' + file}>{icon}{filename}{edit == 'true' ? <TiDelete className={'delete__material__icon' + ' ' + file} onClick={deleteFile} /> : ''}</button>
    )
}

export default FileButton