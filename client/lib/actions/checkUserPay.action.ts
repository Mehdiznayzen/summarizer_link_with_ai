import axios from "axios"

export const checkUserPay = async (email : any) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/customers?email=${email}`)
        return response.data
    } catch (error: any) {
        throw new Error(`Failed fetch user: ${error.message}`)
    }
}