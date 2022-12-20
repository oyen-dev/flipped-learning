import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/Auth'

import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { ClassEvaluationResult, TakeEvaluation } from '../../views/class'

import { useParams, useLocation, useNavigate } from 'react-router-dom'

const EvaluationDetail = () => {
  // useParams
  const { id: classId } = useParams()

  // useLocation
  const { pathname } = useLocation()

  // Navigator
  const navigate = useNavigate()

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  const [paths, setPaths] = useState(
    user && user.role === 'TEACHER'
      ? [
          {
            name: 'Dashboard',
            destination: '/dashboard'
          },
          {
            name: 'Daftar Kelas',
            destination: '/classes'
          },
          {
            name: 'Detail Kelas',
            destination: `/classes/${classId}`
          },
          {
            name: 'Hasil Evaluasi',
            destination: `${pathname}`
          }
        ]
      : [
          {
            name: 'Dashboard',
            destination: '/dashboard'
          },
          {
            name: 'Daftar Kelas',
            destination: '/classes'
          },
          {
            name: 'Detail Kelas',
            destination: `/classes/${classId}`
          },
          {
            name: 'Mengerjakan Evaluasi',
            destination: `${pathname}`
          }
        ]
  )

  // Monitor user
  useEffect(() => {
    setPaths(
      user && user.role === 'TEACHER'
        ? [
            {
              name: 'Dashboard',
              destination: '/dashboard'
            },
            {
              name: 'Daftar Kelas',
              destination: '/classes'
            },
            {
              name: 'Detail Kelas',
              destination: `/classes/${classId}`
            },
            {
              name: 'Hasil Evaluasi',
              destination: `${pathname}`
            }
          ]
        : [
            {
              name: 'Dashboard',
              destination: '/dashboard'
            },
            {
              name: 'Daftar Kelas',
              destination: '/classes'
            },
            {
              name: 'Detail Kelas',
              destination: `/classes/${classId}`
            },
            {
              name: 'Mengerjakan Evaluasi',
              destination: `${pathname}`
            }
          ]
    )
  }, [user])

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full px-3 py-3 rounded-lg bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        {user && user.role === 'TEACHER'
          ? <ClassEvaluationResult />
          : <TakeEvaluation />
        }
      </div>
    </Layout>
  )
}

export default EvaluationDetail
