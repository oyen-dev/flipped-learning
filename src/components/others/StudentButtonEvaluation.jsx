import { useState, useEffect } from 'react'

import api from '../../api'

import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { BsFileText, BsEye } from 'react-icons/bs'
import { Spin } from 'antd'
import Cookies from 'js-cookie'

const StudentButtonEvaluation = (props) => {
  // Destructure props
  const { evaluationId } = props

  // useParams
  const { id: classId } = useParams()

  // useLocation
  const { pathname } = useLocation()

  // Navigator
  const navigate = useNavigate()

  // Local States
  const [submitted, setSubmitted] = useState(null)

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

      // Set value
      setSubmitted(data.data.isSubmitted)
    } catch (error) {
      console.log(error)
    }
  }

  // Navigate to evaluation
  const navigateTo = () => {
    if (submitted === true) {
      navigate(`${pathname}/evaluations/${evaluationId}/result`)
    } else {
      navigate(`${pathname}/evaluations/${evaluationId}`)
    }
  }

  // Initially check submission
  useEffect(() => {
    checkSubmission()
  }, [])

  return (
    <div className="flex flex-row space-x-4 w-full items-center justify-end">
      <button
        to={`${pathname}/evaluations/${evaluationId}`}
        onClick={() => navigateTo()}
        disabled={submitted === null}
        className={`flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white 
            ${submitted === null ? 'bg-gray-400 dark:bg-gray-400' : submitted !== true ? 'bg-blue-600 hover:bg-blue-800' : 'bg-[#34A0A4] hover:bg-green-800'}
        hover:text-white rounded-lg duration-300 ease-in-out`}
      >
        {submitted === null
          ? (
          <Spin size="small" />
            )
          : submitted !== true
            ? (
          <>
            <BsFileText className="w-5 h-5 fill-white" />
            <span>Kerjakan Evaluasi</span>
          </>
              )
            : (
          <>
            <BsEye className="w-5 h-5 fill-white" />
            <span>Lihat Hasil</span>
          </>
              )}
      </button>
    </div>
  )
}

export default StudentButtonEvaluation
