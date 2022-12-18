import { useState, useEffect } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { EditEvaluation as EditEvaluationForm } from '../../components/forms'
import { QuestionDetail } from '../../components/card'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EditEvaluationPage = () => {
  // useParams
  const { id: classId, evaluationId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // useLocation
  const { pathname } = useLocation()

  // Local States
  const [evaluation, setEvaluation] = useState(null)
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

  // Get evaluation detail
  const getEvaluationDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/evaluations/${evaluationId}`, config)
      // console.log(data)

      setEvaluation(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get evaluation detail
  useEffect(() => {
    getEvaluationDetail()
  }, [])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
        <div className="flex flex-col w-full rounded-lg bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {evaluation === null
              ? <Spin size="default" />
              : (
                <>
                  <EditEvaluationForm evaluation={evaluation} />
                  <p className='my-0 text-lg text-center font-semibold'>Daftar Pertanyaan</p>
                  <QuestionDetail />
                </>
                )
            }

          </div>
        </div>
    </Layout>
  )
}

export default EditEvaluationPage
