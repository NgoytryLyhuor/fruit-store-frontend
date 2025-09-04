import axios from 'axios'

const getBaseURL = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000/api'
  }
  // Production URL
  return 'https://pure-flave.apilab.website/api'
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  config => {
    const storedToken = localStorage.getItem('token')
    let token = null

    if (storedToken) {
      try {
        // Try to parse as JSON first (since useAuth stores it as JSON)
        token = JSON.parse(storedToken)
      } catch (error) {
        // If it's not JSON, treat it as plain string
        token = storedToken
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized request - redirecting to login')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(error)
  }
)

export default api
