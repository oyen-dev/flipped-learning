import { useState, useEffect } from 'react'

import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EditEvaluationPage = () => {
  // useParams
  const { id: classId, evaluationId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // useLocation
  const { pathname } = useLocation()

  // Local States
  const [paths] = useState([
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
      name: 'Edit Evaluasi',
      destination: `${pathname}`
    }
  ])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
        <div className="flex flex-col w-full rounded-lg bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
          <div className="flex flex-col space-y-6 px-4 py-4">
            <p>{evaluationId}</p>
          </div>
        </div>
    </Layout>
  )
}

export default EditEvaluationPage
