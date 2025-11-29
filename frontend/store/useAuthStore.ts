import { create } from 'zustand'
import { axiosInstance } from '../src/lib/axios'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

interface User {
  username: string
  _id: string
  fullName: string
  email: string
  createdAt?: string
}

interface SignupFormData {
  username: string
  email: string
  password: string
}

interface LoginFormData {
  email: string
  password: string
}

export interface AuthStore {
  authUser: User | null
  isSigningUp: boolean
  isLoggingIn: boolean
  isCheckingAuth: boolean
  userProfile: User | null

  checkAuth: () => Promise<void>
  signup: (data: SignupFormData) => Promise<void>
  login: (data: LoginFormData) => Promise<void>
  logout: () => Promise<void>
  getUserProfile: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  userProfile: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')
      set({ authUser: res.data })
    } catch (error) {
      console.log('Error in CheckAuth:', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/register', data)
      const { access_token, user } = res.data 

      if (access_token) {
        localStorage.setItem('access_token', access_token)
      }

      set({ authUser: user }) 
      toast.success('Account created successfully!')
    } catch (error) {
      console.log('Error in Signup:', error)
      const err = error as AxiosError<{ message: string }>
      toast.error(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post('/auth/login', data)
      const { access_token, user } = res.data // Destructure the response

      if (access_token) {
        // 1. Store the token in localStorage
        localStorage.setItem('access_token', access_token)
      }
      set({ authUser: user })
      toast.success('Login successful!')
    } catch (error) {
      console.log('Error in Login:', error)
      const err = error as AxiosError<{ message: string }>
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      localStorage.removeItem("access_token");
      set({ authUser: null })
      toast.success('Logout successful!')
    } catch (error) {
      console.log('Error in Logout:', error)
      toast.error('Logout failed. Please try again.')
    }
  },

  getUserProfile: async () => {
    try {
      const res = await axiosInstance.get('/auth/getUserProfile')
      set({ userProfile: res.data })
    } catch (error) {
      console.log('Error in Get User Profile:', error)
      toast.error('Failed to fetch user profile.')
    }
  },
}))
