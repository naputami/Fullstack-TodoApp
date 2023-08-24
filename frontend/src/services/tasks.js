import axios from 'axios'
const baseUrl = 'api/tasks'

let token = null
let config

const setToken = newToken => {
    token = `Bearer ${newToken}`
    config = {
        headers: { Authorization: token },
    }
}

const getAll = async () => {
    const response = await axios.get(baseUrl, config)
    return response.data
}

export default {getAll, setToken}