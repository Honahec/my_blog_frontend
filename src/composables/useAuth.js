import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const token = ref(localStorage.getItem('token'))
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

// 创建一个带有认证拦截器的axios实例
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 添加请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export function useAuth() {
  const router = useRouter()
  const isAuthenticated = computed(() => !!token.value)
  const isStaff = computed(() => user.value?.is_staff || false)

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login/', { username, password })
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register/', userData)
      token.value = response.data.token
      user.value = response.data.user
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout/')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/')
    }
  }

  const checkAuth = async () => {
    if (!token.value) return false
    
    try {
      const response = await api.get('/auth/user/')
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    isStaff,
    login,
    register,
    logout,
    checkAuth,
    api
  }
} 