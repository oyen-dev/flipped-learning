import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'
import { ReportPresences, ReportTasks, ReportEvaluations } from '../../components/tables'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

const ClassSummary = () => {
  // useParams
  const { id: classId, studentId } = useParams()

  // Auth State
  const { authState } = useAuth()
  const { user } = authState

  // Local States
  const [summary, setSummary] = useState(null)

  // Get Summary
  const getSummary = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const path = studentId === undefined
        ? `/class/${classId}/reports/${user._id}`
        : `/class/${classId}/reports/${studentId}`
      const { data } = await api.get(path, config)
      // console.log(data.data)

      setSummary(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get summary
  useEffect(() => {
    getSummary()
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 space-y-4 rounded-lg text-black dark:text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
      {summary === null
        ? <Spin size='default' tip={<span className='mb-0 text-sm'>Sistem sedang menyiapkan data</span>} />
        : <div className='flex flex-col space-y-10 w-full'>
          <ReportPresences presences={summary.presences} />
          <ReportTasks tasks={summary.tasks} />
          <ReportEvaluations evaluations={summary.evaluations} />
        </div>
      }
    </div>
  )
}

export default ClassSummary
