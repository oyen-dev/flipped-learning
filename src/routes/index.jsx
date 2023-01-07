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

import {
  Classes,
  ClassDetailPage,
  EditClassPost,
  TeacherList,
  StudentDetail,
  AttachmentDetail,
  SubmitTaskPage,
  EditSubmittedTaskPage,
  JudgeSubmissionPage,
  EditEvaluationPage,
  EvaluationDetail,
  EvaluationResult,
  StudentEvaluationResult,
  ClassStudentSummary
} from '../pages/user'

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
            <Route path='students/:studentId' element={isAuthenticated ? (<ManagementContext> <StudentDetail /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='attachments/:attachmentId' element={isAuthenticated ? (<ManagementContext> <AttachmentDetail /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='posts/:postId/edit' element={isAuthenticated ? (<ManagementContext> <EditClassPost /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='posts/:postId/grading' element={isAuthenticated ? (<ManagementContext> <JudgeSubmissionPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='tasks/:postId/submissions' element={isAuthenticated ? (<ManagementContext> <SubmitTaskPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='tasks/:postId/submissions/edit' element={isAuthenticated ? (<ManagementContext> <EditSubmittedTaskPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='evaluations/:evaluationId' element={isAuthenticated ? (<ManagementContext> <EvaluationDetail /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='evaluations/:evaluationId/result' element={isAuthenticated ? (<ManagementContext> <EvaluationResult /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='evaluations/:evaluationId/result/:studentId' element={isAuthenticated ? (<ManagementContext> <StudentEvaluationResult /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='evaluations/:evaluationId/edit' element={isAuthenticated ? (<ManagementContext> <EditEvaluationPage /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route path='result/:studentId' element={isAuthenticated ? (<ManagementContext> <ClassStudentSummary /> </ManagementContext>) : (<Navigate to="/auth" />)} />
            <Route index element={isAuthenticated ? <ManagementContext> <ClassDetailPage /> </ManagementContext> : <Navigate to="/auth" />}/>
          </Route>
          <Route index element={isAuthenticated ? <ManagementContext> <Classes /> </ManagementContext> : <Navigate to="/auth" />} />
        </Route>

        {/* Handle page not found */}
        <Route path="*" element={<NotFound />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

const ManagementContext = ({ children }) => {
  return <ManagementProvider>{children}</ManagementProvider>
}
