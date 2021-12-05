import matematica from '../assets/images/matematica.png'
import astronomia from '../assets/images/astronomia.png'
import direito from '../assets/images/direito.png'
import programacao from '../assets/images/programacao.png'
import quimica from '../assets/images/quimica.png'
import idiomas from '../assets/images/idiomas.png'

const setGroupIcon = (discipline) => {
    let icon

    switch(discipline) {
        case 'matemática':
            icon = matematica
            break
        case 'astronomia':
            icon = astronomia
            break
        case 'direito':
            icon = direito
            break
        case 'programacao':
            icon = programacao
            break 
        case 'quimica':
            icon = quimica
            break
        case 'idiomas':
            icon = idiomas
            break
        default:
            icon = astronomia
             break            
    }

    return icon
}

export default setGroupIcon