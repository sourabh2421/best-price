import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'
import { API_URL } from '../config'

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {}

      const response = await fetch(`${API_URL}/api/admin/check`, {
        credentials: 'include',
        headers: headers,
      })
      setIsAuthenticated(response.ok)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {}

      await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: headers,
      })
      
      // Clear token from localStorage
      localStorage.removeItem('admin_token')
      
      setIsAuthenticated(false)
      navigate('/admin')
    } catch (error) {
      console.error('Logout error:', error)
      // Clear token even if logout request fails
      localStorage.removeItem('admin_token')
      setIsAuthenticated(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  )
}

export default AdminPage
