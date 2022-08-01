import matematica from '../assets/images/matematica.png'
import astronomia from '../assets/images/astronomia.png'
import direito from '../assets/images/direito.png'
import programacao from '../assets/images/programacao.png'
import quimica from '../assets/images/quimica.png'
import coreano from '../assets/images/coreano.png'
import ingles from '../assets/images/ingles.png'
import espanhol from '../assets/images/espanhol.png'
import musica from '../assets/images/music.png'
import filosofia from '../assets/images/filosofia.png'
import design from '../assets/images/design.png'
import fisica from '../assets/images/fisica.png'
import geografia from '../assets/images/geografia.png'

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
        case 'ingles':
            icon = ingles
            break
        case 'espanhol':
            icon = espanhol
            break
        case 'coreano':
            icon = coreano
            break
        case 'filosofia':
            icon = filosofia
            break
        case 'música':
            icon = musica
            break
        case 'física':
            icon = fisica
            break
        case 'design':
            icon = design
            break
        case 'geografia':
            icon = geografia
            break
        default:
            icon = astronomia
             break            
    }

    return icon
}

export default setGroupIcon