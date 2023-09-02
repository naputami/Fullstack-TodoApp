import axios from "axios"
const baseUrl = 'api/projects'

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

const postProject = async projectObj => {
    const response = await axios.post(baseUrl, projectObj, config)
    return response.data
}

const deleteProject = async projectObj => {
    const response = await axios.delete(`${baseUrl}/${projectObj.id}`, config)
    return response.data
}

const putProject = async projectObj => {
    const response = await axios.put(`${baseUrl}/${projectObj.id}`, projectObj, config)
    return response.data
}
export default {getAll, postProject, deleteProject, putProject, setToken}
