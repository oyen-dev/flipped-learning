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
  ClassDetailPage as AdminClassDetailPage,
  StudentDetailPage,
  EditStudentPage,
  ManagementTeacherPage,
  TeacherDetailPage,
  EditTeacherPage,
  EditProfilePage
} from '../pages/admin'

import { Classes, ClassDetailPage, TeacherList } from '../pages/user'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export default function AppRoutes () {
  // Global States
  const { globalState } = useGlobal()
  const { theme } = globalState

  // Auth States
  const { authState } = useAuth()
  const { isAuthenticated, socket, user, singleEmit, setSingleEmit } = authState

  // Dark switcher
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Emit user online when socketReady and userReady
  useEffect(() => {
    if (singleEmit) {
      if (user._id !== undefined) {
        socket.emit('req_onlineUser', { userId: user._id })
        setSingleEmit(false)
      } else {
        console.log('No user')
      }
    }
  }, [socket, user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />} />
        <Route path="/profile" element={isAuthenticated ? <ManagementContext> <EditProfilePage /> </ManagementContext> : <Navigate to="/auth" />} />

        <Route path="/management">
          <Route path='classes'>
            <Route path=':id'>
              <Route path='teachers/:id' element={isAuthenticated ? (<ManagementContext> <TeacherDetailPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
              <Route index element={isAuthenticated ? (<ManagementContext> <AdminClassDetailPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            </Route>
            <Route index element={isAuthenticated ? (<ManagementContext> <ManagementClassPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
          </Route>
          <Route path="students">
            <Route path=':id' element={isAuthenticated ? (<ManagementContext> <StudentDetailPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path=':id/edit' element={isAuthenticated ? (<ManagementContext> <EditStudentPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route index element={ isAuthenticated ? (<ManagementContext> <ManagementStudentPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
          </Route>
          <Route path="teachers">
            <Route path=':id' element={isAuthenticated ? (<ManagementContext> <TeacherDetailPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path=':id/edit' element={isAuthenticated ? (<ManagementContext> <EditTeacherPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route index element={ isAuthenticated ? (<ManagementContext> <ManagementTeacherPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
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

        <Route path="/classes">
          <Route path=':id'>
            <Route path='teachers/:id' element={isAuthenticated ? (<ManagementContext> <TeacherList /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route index element={isAuthenticated ? <ClassDetailPage /> : <Navigate to="/auth" />}/>
          </Route>
          <Route index element={isAuthenticated ? <ManagementContext> <Classes /> </ManagementContext> : <Navigate to="/auth" />} />
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
