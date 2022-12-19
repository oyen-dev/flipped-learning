import { useState } from 'react'
import { useAuth } from '../../contexts/Auth'

import { Link } from 'react-router-dom'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

const QuestionDetail = (props) => {
  // Props Destructure
  const { questionDetail, setFetchEvaluation } = props
  const { question, options, key, _id } = questionDetail

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Local States
  const [selectedAnswer, setSelectedAnswer] = useState(key)

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value)
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
              className="cursor-pointer hover:text-semibold group"
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === index}
                hidden
                disabled
                onChange={handleAnswerChange}
                className="mr-2 cursor-pointer"
              />
              <span
                className={`duration-75 ease-in-out ${
                  selectedAnswer === index
                    ? 'font-bold bg-green-400 py-1 px-2 rounded-lg'
                    : 'group-hover:font-semibold'
                }`}
              >
                {String.fromCharCode(97 + index).toUpperCase()}. {option}
              </span>
              <br />
            </label>
          ))}
        </div>

        {user && user.role === 'TEACHER' && (
          <div className="flex flex-row space-x-4 w-full items-center justify-end">
            <Link
              to={0}
              className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out"
            >
              <BsPencilSquare className="w-5 h-5 fill-white" />
              <span>Edit Pertanyaan</span>
            </Link>

            <button className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg duration-300 ease-in-out">
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
