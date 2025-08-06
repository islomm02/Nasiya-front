import axios from 'axios'
import { API } from '../hooks/getEnv'
import { useCookies } from 'react-cookie'

const API_GET = axios.create({
  baseURL: API,
})

API_GET.interceptors.request.use((config) => {
      const [cookies, __, removeCookie] = useCookies(["token"]);
   
  if (cookies.token) {
    config.headers.Authorization = `Bearer ${cookies.token}`
  }
  return config
})

export default API_GET
