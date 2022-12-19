import { useState, useEffect } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { EditEvaluation as EditEvaluationForm } from '../../components/forms'
import { QuestionList } from '../../components/tables'
import { QuestionDetail } from '../../components/card'
import { AddQuestion } from '../../components/modals'

import Cookies from 'js-cookie'
import { BsPlus } from 'react-icons/bs'
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
  const [fetchEvaluation, setFetchEvaluation] = useState(true)
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
    // Reset evaluation
    setEvaluation(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(
        `/class/${classId}/evaluations/${evaluationId}`,
        config
      )
      // console.log(data)

      setEvaluation(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get evaluation detail
  useEffect(() => {
    if (fetchEvaluation) {
      getEvaluationDetail()
      setFetchEvaluation(false)
    }
  }, [fetchEvaluation])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full rounded-lg bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        <div className="flex flex-col space-y-2 px-4 py-4">
          {evaluation === null
            ? (
            <Spin size="default" />
              )
            : (
            <>
              <EditEvaluationForm evaluation={evaluation} setFetchEvaluation={setFetchEvaluation}/>
              <QuestionList evaluation={evaluation} />
              <QuestionDetail evaluation={evaluation} />
            </>
              )}
        </div>

        {/* Add Question Button */}
        <label
          htmlFor="modal-add-question"
          className="modal-button fixed z-40 bottom-8 right-8 bg-[#34A0A4] w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center cursor-pointer text-white text-4xl hover:bg-[#7C3AED] hover:drop-shadow-2xl duration-300"
        >
          <BsPlus />
        </label>

        {/* Modal container */}
        <input
          type="checkbox"
          id="modal-add-question"
          className="modal-toggle"
        />
        <AddQuestion />
      </div>
    </Layout>
  )
}

export default EditEvaluationPage
