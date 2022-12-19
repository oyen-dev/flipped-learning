import { useState, useEffect } from 'react'
import { useManagement } from '../../contexts/Management'

import api from '../../api'
import { EditQuestion as EditQuestionForm } from '../forms'

import Cookies from 'js-cookie'
import { BsXLg } from 'react-icons/bs'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'

const EditQuestion = (props) => {
  // Props Destructure
  const { setFetchEvaluation } = props

  // useParams
  const { id: classId, evaluationId } = useParams()

  // useManagement
  const { managementStates } = useManagement()
  const { setWilUpdateQuestionId, wilUpdateQuestionId } = managementStates

  // Local States
  const [question, setQuestion] = useState(null)

  // Close daisy ui modal
  const closeModal = () => {
    // Reset states
    setQuestion(null)
    setWilUpdateQuestionId(null)

    const modal = document.getElementById('modal-edit-question')
    modal.checked = false
  }

  // Get question detail
  const getQuestionDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/evaluations/${evaluationId}/questions/${wilUpdateQuestionId}`, config)
      // console.log(data)

      setQuestion(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get question detail
  useEffect(() => {
    getQuestionDetail()
  }, [wilUpdateQuestionId])

  return (
    <div className="modal w-full h-screen" style={{ margin: 0 }}>
      <div className="modal-box max-h-[70%] w-11/12 max-w-5xl bg-[#e9ecef] dark:bg-gray-900 transition-all ease-in-out duration-300">

        {/* Title */}
        <div className="flex flex-col w-full h-full">
          <label
            htmlFor="modal-edit-question"
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <BsXLg />
          </label>
          <h4 className="font-semibold text-lg text-center text-black dark:text-white">
            Edit Pertanyaan
          </h4>
        </div>

        {/* Form */}
        <div className="flex flex-col w-full overflow-y-auto pr-5">
          {question && question._id
            ? <EditQuestionForm question={question} setFetchEvaluation={setFetchEvaluation} closeModal={closeModal} />
            : <Spin size="default" />
          }
        </div>

      </div>
    </div>
  )
}

export default EditQuestion
