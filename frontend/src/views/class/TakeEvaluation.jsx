import { useState, useEffect } from 'react'

import api from '../../api'
import QuestionList from './QuestionList'

import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Spin } from 'antd'

const TakeEvaluation = () => {
  // useParams
  const { id: classId, evaluationId } = useParams()

  // Local States
  const [evaluation, setEvaluation] = useState(null)
  const [answers, setAnswers] = useState(null)
  const evaluationProps = {
    evaluation,
    answers,
    setAnswers
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
