import axios from 'axios'

const baseUrl = 'api/auth'

let token = null
let config

const setToken = newToken => {
    token = `Bearer ${newToken}`
    config = {
        headers: { Authorization: token },
    }
}

const login = async credential => {
    const response = await axios.post(`${baseUrl}/login`, credential)
    console.log("response login", response)
    return response.data
}

const logout = async () => {
    const response = await axios.post(`${baseUrl}/logout`, null, config)
    return response.data
}

export default {login, logout, setToken}