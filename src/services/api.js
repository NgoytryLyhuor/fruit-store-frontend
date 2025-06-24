import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
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
    // Remove the console.warn - it's normal to not have a token sometimes

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
