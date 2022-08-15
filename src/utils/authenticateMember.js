import api from "../services/api"

const authenticateMember = async (groupId, userId) => {
    const token = localStorage.getItem('userToken')
    const headers = { Authorization: `Bearer ${token}` }
    const {data} = await api.get(`users/${userId}`, {headers})
    const {groups} = data
    const groupsIds = groups.map(group => group._id)
    if(groupsIds.includes(groupId)) {
        return true
    } else {
        return false
    }
}

export default authenticateMember