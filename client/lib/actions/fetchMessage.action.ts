import axios from "axios"

export const getMessage = async (id : number) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/messages/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(`Failed fetch user: ${error.message}`)
    }
}