import axios from "axios"



async function login(userFormData){
    const response = await axios.post("/api/login", userFormData)
    return response.data
}

const authServices = { login }

export default authServices