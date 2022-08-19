import axios from 'axios'

const api = axios.create({
	//baseURL: 'https://hakunah.herokuapp.com/api/v1/'
	baseURL: 'http://localhost:8080/api/v1/'
})

export default api