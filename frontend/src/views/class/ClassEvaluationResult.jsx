import { useState, useEffect } from 'react'

import api from '../../api'
import { StudentEvaluation } from '../../components/tables'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'

const ClassEvaluationResult = () => {
  // useParams
  const { id: classId, evaluationId } = useParams()

  // Local states
  const [students, setStudents] = useState(null)
  const [evaluation, setEvaluation] = useState(null)

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

  // Get students evaluation submission
  const getStudentsSubmission = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/evaluations/${evaluationId}/submissions`, config)
      // console.log(data)

      // Set values
      setStudents(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get students submission
  useEffect(() => {
    getEvaluationDetail()
    getStudentsSubmission()
  }, [])
  return (
    <div className="flex flex-col w-full items-center justify-center">
      {students === null || evaluation === null
        ? <Spin size="default" />
        : <StudentEvaluation students={students} evaluation={evaluation} />
      }
    </div>
  )
}

export default ClassEvaluationResult
