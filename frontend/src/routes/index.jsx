import { useEffect } from 'react'
import { useGlobal } from '../contexts/Global'
import { LoginPage, RegisterPage, ForgotPage } from '../pages/auth'
import { NotFound } from '../pages/error'
import { DashboardPage, ManagementClassPage, ManagementStudentPage } from '../pages/admin'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

export default function AppRoutes () {
  // Global States
  const { globalState } = useGlobal()
  const { theme } = globalState

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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/management">
          <Route path="classes" element={<ManagementClassPage />} />
          <Route path="students" element={<ManagementStudentPage />} />
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
