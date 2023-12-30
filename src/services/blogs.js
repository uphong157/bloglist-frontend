import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateById = async (id, update) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(baseUrl + id, update, config)
  return response.data
}

export default { setToken, getAll, create, updateById }