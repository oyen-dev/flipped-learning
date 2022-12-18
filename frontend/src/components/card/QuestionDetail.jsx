import { useState } from 'react'

const QuestionDetail = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value)
  }

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

  return (
    <div className="flex flex-col w-full px-3 py-3 text-black dark:text-white rounded-md duration-300 ease-in-out">
      {/* Make a list of a answer using radio */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 text-2xl font-bold text-gray-800">
          {question}
        </div>

        <div className="flex flex-col space-y-2 mb-4 text-gray-700">
          {options.map((option, index) => (
            <label key={index} className="cursor-pointer hover:text-semibold group">
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
                selectedAnswer === option.text ? 'font-bold bg-green-400 py-1 px-2 rounded-lg' : 'group-hover:font-semibold'
              }`}
            >
              {option.text}
            </span>
            <br />
          </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionDetail
