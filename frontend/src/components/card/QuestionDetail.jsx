import { useState } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'
import { useManagement } from '../../contexts/Management'

import api from '../../api'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

const QuestionDetail = (props) => {
  // Props Destructure
  const { questionDetail, setFetchEvaluation } = props
  const { question, options, key, _id } = questionDetail

  // useParams
  const { id: classId, evaluationId } = useParams()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // useManagement
  const { managementStates } = useManagement()
  const { setWilUpdateQuestionId } = managementStates

  // Local States
  const [selectedAnswer] = useState(key)

  // Delete question
  const deleteQuestion = async () => {
    // Show loading
    mySwal.fire({
      title: 'Menghapus pertanyaan.',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      await api.delete(`/class/${classId}/evaluations/${evaluationId}/questions/${_id}`, config)

      // Show success message
      mySwal.fire({
        icon: 'success',
        title: 'Pertanyaan berhasil dihapus!',
        showConfirmButton: false,
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true
      }).then(() => setFetchEvaluation(true))
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: error.response.data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    }
  }

  // Delete dialog
  const dialogDeleteQuestion = () => {
    mySwal.fire({
      icon: 'warning',
      title: 'Apakah Anda yakin?',
      text: 'Pertanyaan yang dihapus tidak dapat dikembalikan.',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Batal',
      cancelButtonColor: '#3085d6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuestion()
      }
    })
  }

  return (
    <div className="flex flex-col w-full px-3 space-y-4 text-black dark:text-white rounded-md duration-300 ease-in-out">

      {/* Make a list of a answer using radio */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 text-2xl font-bold text-gray-800">{question}</div>
        <div className="flex flex-col space-y-2 mb-4 text-gray-700">
          {options.map((option, index) => (
            <label
              key={index}
              className="hover:text-semibold group"
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === index}
                hidden
                disabled
                className="mr-2"
              />
              <span
                className={`duration-75 ease-in-out ${
                  selectedAnswer === index
                    ? 'font-bold bg-green-400 py-1 px-2 rounded-lg'
                    : ''
                }`}
              >
                <span className='font-bold'>{String.fromCharCode(97 + index).toUpperCase()}.</span> {option}
              </span>
              <br />
            </label>
          ))}
        </div>

        {user && user.role === 'TEACHER' && (
          <div className="flex flex-row space-x-4 w-full items-center justify-end">
            <label
              onClick={() => setWilUpdateQuestionId(_id)}
              htmlFor="modal-edit-question"
              className="modal-button flex flex-row space-x-2 cursor-pointer items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out"
            >
              <BsPencilSquare className="w-5 h-5 fill-white" />
              <span>Edit Pertanyaan</span>
            </label>

            <button onClick={dialogDeleteQuestion} className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg duration-300 ease-in-out">
              <BsTrash className="w-5 h-5 fill-white" />
              <span>Hapus Pertanyaan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionDetail
