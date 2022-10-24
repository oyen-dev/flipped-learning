import { useEffect } from 'react'

import { useGlobal } from '../contexts/Global'
import { useAuth } from '../contexts/Auth'
import { ManagementProvider } from '../contexts/Management'

import { LoginPage, RegisterPage, ForgotPage, VerifyPage, ResetPasswordPage } from '../pages/auth'
import { NotFound } from '../pages/error'
import {
  DashboardPage,
  ManagementClassPage,
  ManagementStudentPage,
  ClassDetailPage,
  StudentDetailPage,
  EditStudentPage
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
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />
          }
        />
        <Route path="/management">
          <Route path='classes'>
            <Route path=':id' element={isAuthenticated ? (<ManagementContext> <ClassDetailPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route index element={isAuthenticated ? (<ManagementContext> <ManagementClassPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
          </Route>
          <Route path="students">
            <Route path=':id' element={isAuthenticated ? (<ManagementContext> <StudentDetailPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path=':id/edit' element={isAuthenticated ? (<ManagementContext> <EditStudentPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route index element={ isAuthenticated ? (<ManagementContext> <ManagementStudentPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
          </Route>
          <Route index element={<NotFound />} />
        </Route>
        <Route path="/auth">
          <Route path="register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage /> } />
          <Route path="forgot-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPage />} />
          <Route path="verify" element={isAuthenticated ? <Navigate to="/dashboard" /> : <VerifyPage />} />
          <Route path="reset-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ResetPasswordPage />} />
          <Route index element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
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
