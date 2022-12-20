import { useState } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'

import Cookies from 'js-cookie'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EvaluationResult = () => {
  // useParams
  const { id: classId, evaluationId } = useParams()

  // useLocation
  const { pathname } = useLocation()

  // Navigator
  const navigate = useNavigate()

  // Local States
  const [paths] = useState(
    [
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
  )
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full px-3 py-3 rounded-lg bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        <p>Hasil evaluasi ${evaluationId}</p>
      </div>
    </Layout>
  )
}

export default EvaluationResult
