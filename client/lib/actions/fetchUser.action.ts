import axios from "axios"

export const fetchUser = async (user_id : any) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users?id=${user_id}`)
        return response.data
    } catch (error: any) {
        throw new Error(`Failed fetch user: ${error.message}`)
    }
}