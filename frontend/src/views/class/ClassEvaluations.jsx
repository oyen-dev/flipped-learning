import { useState, useEffect } from 'react'

import { CreateEvaluation } from '../../components/modals'
import api from '../../api'
import { Empty } from '../../pages/error'
import { EvaluationList } from './index'

import { Spin } from 'antd'
import { BsPlus } from 'react-icons/bs'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const ClassEvaluations = () => {
  // useParams
  const { id: classId } = useParams()

  // Local States
  const [evaluations, setEvaluations] = useState(null)

  // Get class evaluations
  const getClassEvaluations = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/evaluations`, config)
      // console.log(data)
      setEvaluations(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get class evaluations
  useEffect(() => {
    getClassEvaluations()
  }, [])
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 space-y-4 rounded-lg text-black dark:text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">

      {evaluations === null
        ? <Spin size='default' />
        : evaluations.length === 0
          ? <Empty message='Belum ada evaluasi di kelas.' />
          : <EvaluationList evaluations={evaluations} />
      }

      {/* Create Evaluation Button */}
      <label
          htmlFor="modal-create-evaluation"
          className="modal-button fixed z-40 bottom-8 right-8 bg-[#34A0A4] w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center cursor-pointer text-white text-4xl hover:bg-[#7C3AED] hover:drop-shadow-2xl duration-300"
        >
          <BsPlus />
        </label>

      {/* Modal container */}
      <input
          type="checkbox"
          id="modal-create-evaluation"
          className="modal-toggle"
        />
        <CreateEvaluation />
    </div>
  )
}

export default ClassEvaluations
