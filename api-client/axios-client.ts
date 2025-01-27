import axios, { AxiosError } from "axios";
const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.response.use(
    function (response) {{
        return response.data
    }},
    function (error: AxiosError) {
        return Promise.reject(error.response?.data)
    }
)

export default axiosClient;