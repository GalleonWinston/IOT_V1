import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { type AuthStore } from '../../store/useAuthStore'
import { useShallow } from 'zustand/shallow'
import { RefreshCw, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  const navigate = useNavigate()

  const { authUser, logout } = useAuthStore(
    useShallow((state: AuthStore) => ({
      authUser: state.authUser,
      logout: state.logout,
    }))
  )

  const handleLogout = async () => {
    await logout()

    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Navigation Bar --- */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex-0 flex items-center">
              <RefreshCw className="h-6 w-6 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EcoBin IoT Dashboard</span>
            </div>

            {/* User Info & Logout Button */}
            <div className="flex items-center space-x-4">
              {authUser && (
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <User className="h-5 w-5 mr-1 text-green-500" />
                  Welcome, <span className="ml-1 font-semibold">{authUser.username || 'User'}</span>
                </div>
              )}
              <button
                onClick={handleLogout} // Calls the updated async handler
                className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Dashboard Content --- */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Overview</h1>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Real-Time Waste Metrics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder Card 1 */}
              <div className="bg-blue-100 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-blue-800">Total Bins Monitored</p>
                <p className="text-3xl font-bold text-blue-900">125</p>
              </div>

              {/* Placeholder Card 2 */}
              <div className="bg-yellow-100 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-yellow-800">Average Fill Level</p>
                <p className="text-3xl font-bold text-yellow-900">65%</p>
              </div>

              {/* Placeholder Card 3 */}
              <div className="bg-red-100 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-red-800">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-900">4 Bins</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
