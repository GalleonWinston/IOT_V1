import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.ts'

import NotFound from './pages/NotFoundPage.tsx'
import HomePage from './pages/HomePage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import DashBoardPage from './pages/DashBoardPage.tsx'

import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log('Auth User:', authUser)

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <>
      <Routes>
        {/* public path */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signin"
          element={!authUser ? <SignInPage /> : <Navigate to="/dashboard" replace />}
        />

        {/* protected path */}
        <Route
          path="/dashboard"
          element={authUser ? <DashBoardPage /> : <Navigate to="/login" replace />}
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
