import { useState, useEffect } from 'react'

import api from '../../api'
import QuestionList from './QuestionList'

import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Spin } from 'antd'

const TakeEvaluation = () => {
  // useParams
  const { id: classId, evaluationId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Local States
  const [evaluation, setEvaluation] = useState(null)
  const [answers, setAnswers] = useState(null)
  const evaluationProps = {
    evaluation,
    answers,
    setAnswers
  }

  // Check if submitted
  const checkSubmission = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(
        `/class/${classId}/evaluations/${evaluationId}/check`,
        config
      )
      //   console.log(data)

      if (data.data.isSubmitted === true) {
        navigate('result')
      }
    } catch (error) {
      console.log(error)
    }
  }

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
      const { data } = await api.get(`/class/${classId}/evaluations/${evaluationId}`, config)
      const { questions } = data.data
      // console.log(data)

      // Set values
      setEvaluation(data.data)
      setAnswers(questions.map((question) => {
        return {
          question,
          answer: null
        }
      }))
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get evaluation detail
  useEffect(() => {
    checkSubmission()
    getEvaluationDetail()
  }, [])

  return (
    <div className="flex flex-col w-full">
      {evaluation === null
        ? <Spin size="default" />
        : <QuestionList {...evaluationProps} />
      }
    </div>
  )
}

export default TakeEvaluation
