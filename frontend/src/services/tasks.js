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
    console.log(config)
    const response = await axios.get(baseUrl, config)
    return response.data
}

const postTask = async taskObj => {
    const response = await axios.post(baseUrl, taskObj, config)
    return response.data
}

export default {getAll, postTask, setToken}