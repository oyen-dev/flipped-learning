import { useEffect } from 'react'

import { useGlobal } from '../contexts/Global'
import { useAuth } from '../contexts/Auth'
import { ManagementProvider } from '../contexts/Management'

import { LoginPage, RegisterPage, ForgotPage } from '../pages/auth'
import { NotFound } from '../pages/error'
import {
  DashboardPage,
  ManagementClassPage,
  ManagementStudentPage
} from '../pages/admin'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export default function AppRoutes () {
  // Global States
  const { globalState } = useGlobal()
  const { theme } = globalState

  // Auth States
  const { authState } = useAuth()
  const { isAuthenticated } = authState

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />
          }
        />
        <Route path="/management">
          <Route
            path="classes"
            element={
              isAuthenticated
                ? (
                <ManagementContext>
                  <ManagementClassPage />
                </ManagementContext>
                  )
                : (
                <Navigate to="/auth" />
                  )
            }
          />
          <Route
            path="students"
            element={
              isAuthenticated
                ? (
                  <ManagementContext>
                    <ManagementStudentPage />
                  </ManagementContext>
                  )
                : (
                <Navigate to="/auth" />
                  )
            }
          />
          <Route index element={<NotFound />} />
        </Route>
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPage />} />
          <Route index element={<LoginPage />} />
        </Route>

        {/* Handle page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

const ManagementContext = ({ children }) => {
  return <ManagementProvider>{children}</ManagementProvider>
}
