import axios from "axios"

const baseUrl = 'api/auth/register'

const register = async newUser => {
    const response = await axios.post(baseUrl, newUser)
    return response
}

export default {register}