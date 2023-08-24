const setToken = newToken => {
    const token = `Bearer ${newToken}`
    const config = {
        headers: { Authorization: token },
    }

    return config
}

export default setToken