import axios from "axios"

export const registerApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
    )

    return res.data
}


export const loginApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,
        payload,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        }
    )

    return res.data
}

export const getUser = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getUser`,
        
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        }
    )

    return res.data
}


export const logoutApi = async()=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/logout`,
        {},
         {
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        }
    )
    return res.data
}

export const updateProfileApi = async(formData)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/updateProfile`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
        }
    )
    return res.data
}