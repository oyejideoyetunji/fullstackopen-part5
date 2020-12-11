import axios from "axios"


const baseUrl = "/api/blogs/"
let token = null


function setToken(newToken){
    token = `Bearer ${newToken}`
}

async function getAll(){
    const response = await axios.get(baseUrl)
    return response.data
}

async function create(blogData){
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(baseUrl, blogData, config)
    
    return response.data
}

async function update(id, data){
    const response = await axios.put(`${baseUrl}/${id}`, data)
    return response.data
}

const blogService = { getAll, create, setToken, update }

export default blogService