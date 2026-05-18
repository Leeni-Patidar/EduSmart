import axios from "axios"

export const confirmPurchaseApi = async(courseId)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/confirm-purchase`,
        {courseId},
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials:true
        }
    )
    return res.data
}