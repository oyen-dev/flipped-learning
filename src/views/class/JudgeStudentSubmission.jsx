import { useState, useEffect } from 'react'

import api from '../../api'
import { GradeSubmission, StudentName, TaskHeader } from '../../components/card'
import { Empty } from '../../pages/error'

import Cookies from 'js-cookie'
import { Divider, Spin } from 'antd'
import { useSearchParams, useParams } from 'react-router-dom'
import { BsCaretRight, BsCaretLeft } from 'react-icons/bs'

const JudgeStudentSubmission = (props) => {
  // Props destructuring
  const { post, submissions } = props

  // useParams
  const { id: classId, postId } = useParams()

  // useSearchParams
  const [searchParams] = useSearchParams()
  const submissionId = searchParams.get('submissionId')

  // Local states
  const [submissionList] = useState(submissions.map((obj) => {
    return {
      student: obj.student,
      submission: obj.submission ? obj.submission._id : null
    }
  }))
  const [currentSubmission, setCurrentSubmission] = useState(submissionList.findIndex((obj) => obj.submission === submissionId))
  const [currentSubmissionData, setCurrentSubmissionData] = useState(null)

  // Handle next submission
  const handleNextSubmission = () => {
    if (currentSubmission < submissionList.length - 1) {
      setCurrentSubmission(currentSubmission + 1)
    }
  }

  // Handle previous submission
  const handlePreviousSubmission = () => {
    if (currentSubmission > 0) {
      setCurrentSubmission(currentSubmission - 1)
    }
  }

  // Get current submission
  const getCurrentSubmission = async () => {
    // Set currentSubmissionData to null
    setCurrentSubmissionData(null)

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/posts/${postId}/submissions/${submissionList[currentSubmission].submission}`, config)
      //   console.log(data)

      const { submission } = data.data
      setCurrentSubmissionData(submission)
    } catch (error) {
      console.log(error)
      setCurrentSubmissionData(undefined)
    }
  }

  // Monitor when currentSubmission changes
  useEffect(() => {
    if (submissionList[currentSubmission].submission) {
      getCurrentSubmission()
    } else {
      setCurrentSubmissionData(undefined)
    }
  }, [currentSubmission])

  return (
    <div className='flex flex-col w-full space-y-4'>
      <TaskHeader post={post} />

      {/* Navigation */}
      <div className="flex flex-row w-full justify-between">
        <button
          onClick={handlePreviousSubmission}
          disabled={currentSubmission === 0}
          className="flex flex-row items-center justify-start group duration-300 ease-in-out">
          <BsCaretLeft className={`w-6 h-6 ${currentSubmission === 0 ? 'fill-gray-400' : 'group-hover:fill-blue-500'}`} />
          <span className={`${currentSubmission === 0 ? 'text-gray-400' : 'group-hover:text-blue-500'}`}>Sebelumnya</span>
        </button>

        <button
          onClick={handleNextSubmission}
          disabled={currentSubmission === submissionList.length - 1}
          className="flex flex-row items-center justify-start group duration-300 ease-in-out">
          <span className={`${currentSubmission === submissionList.length - 1 ? 'text-gray-400' : 'group-hover:text-blue-500'}`}>Selanjutnya</span>
          <BsCaretRight className={`w-6 h-6 ${currentSubmission === submissionList.length - 1 ? 'fill-gray-400' : 'group-hover:fill-blue-500'}`} />
        </button>
      </div>

      {/* Divider */}
      <Divider className='bg-black dark:bg-white duration-300 ease-in-out'/>

      {/* Submission */}
      <div className="flex flex-col space-y-4 w-full items-start justify-center">

        {/* Student Details */}
        <StudentName student={submissionList[currentSubmission].student} />

        {/* Student Submission */}
        <div className="flex w-full items-center justify-center">
            {currentSubmissionData === null
              ? <Spin size='default' />
              : currentSubmissionData === undefined
                ? <Empty message='Belum mengumpulkan penugasan' />
                : <GradeSubmission currentSubmissionData={currentSubmissionData} />
            }
        </div>

      </div>
    </div>
  )
}

export default JudgeStudentSubmission
