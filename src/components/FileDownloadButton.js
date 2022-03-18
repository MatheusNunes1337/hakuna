import React, {useEffect, useState} from 'react'

import setFileButtonProperties from '../utils/setFileButtonProperties'

function FileButton ({file}) {
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

    return (
        <button className={classname}>{icon}{filename}</button>
    )
}

export default FileButton