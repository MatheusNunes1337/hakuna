import axios from 'axios'

const api = axios.create({
	baseURL: 'https://hakunaa-api.herokuapp.com/api/'
})

export default api