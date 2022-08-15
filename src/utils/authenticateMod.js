import api from "../services/api"

const authenticateModerator = async (groupId, userId) => {
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }
    const {data} = await api.get(`groups/${groupId}`, {headers})
    const {mods} = data
    const modsIds = mods.map(mod => mod._id)
    if(modsIds.includes(userId)) {
        return true
    } else {
        return false
    }
}

export default authenticateModerator