import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    return axios.get(baseUrl)
}

const post = (newData) => {
    return axios.post(baseUrl, newData)
}

const deleteItem = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    get,post,deleteItem
}