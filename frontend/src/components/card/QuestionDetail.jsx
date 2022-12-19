import { useState } from 'react'
import { useAuth } from '../../contexts/Auth'

import { Empty } from '../../pages/error'

import { Link } from 'react-router-dom'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

const QuestionDetail = (props) => {
  // Props Destructure
  const { evaluation } = props
  const { questions } = evaluation

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  const question = 'What is Tailwind CSS?'
  const options = [
    {
      id: 'option1',
      text: 'Option 1: '
    },
    {
      id: 'option2',
      text: 'Option 2: ing custom user interfaces.'
    },
    {
      id: 'option3',
      text: 'Option 3: Tail CSS framework for rapidly building custom user interfaces.'
    },
    {
      id: 'option4',
      text: 'Option 4: Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.'
    }
  ]

  // Local States
  const [selectedAnswer, setSelectedAnswer] = useState(options[2].text)

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value)
  }

  return (
    <div className="flex flex-col w-full px-3 space-y-4 text-black dark:text-white rounded-md duration-300 ease-in-out">
    <Empty message='Belum ada pertanyaan pada evaluasi ini.' />

      {/* Make a list of a answer using radio */}
      {/* <div className="bg-white rounded-lg shadow-lg p-6">
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
                value={option.text}
                checked={selectedAnswer === option.text}
                hidden
                disabled
                onChange={handleAnswerChange}
                className="mr-2 cursor-pointer"
              />
              <span
                className={`duration-75 ease-in-out ${
                  selectedAnswer === option.text
                    ? 'font-bold bg-green-400 py-1 px-2 rounded-lg'
                    : 'group-hover:font-semibold'
                }`}
              >
                {String.fromCharCode(97 + index).toUpperCase()}. {option.text}
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
      </div> */}
    </div>
  )
}

export default QuestionDetail
