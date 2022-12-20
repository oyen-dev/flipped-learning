import { useState } from 'react'
import momentId from '../../constants/momentId'

import { ResultQuestion } from '../../components/card'

import { BsCaretLeft, BsCaretRight } from 'react-icons/bs'
import { Divider, Tag } from 'antd'
import moment from 'moment/moment'

moment.updateLocale('id', momentId)

const ResultList = (props) => {
  // Props Destructuring
  const { answers, points, createdAt } = props

  // Local States
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [question, setQuestion] = useState(answers[currentQuestion].questionId)
  const resultProps = {
    question,
    answer: answers[currentQuestion].answer,
    currentQuestion
  }

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < answers.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setQuestion(answers[currentQuestion + 1].questionId)
    }
  }

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setQuestion(answers[currentQuestion - 1].questionId)
    }
  }

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row space-x-2 items-center">
        <p className='mb-0 font-bold text-base'>Nilai:</p>
        <Tag color='#108ee9'>
          <span className='mb-0 text-base'>{points}</span>
        </Tag>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <p className='font-bold mb-0 text-base'>Dikerjakan pada:</p>
        <p className='mb-0 text-base'>{moment(createdAt).format('dddd, DD MMMM YYYY HH:mm')}</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-row w-full justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="flex flex-row items-center justify-start group duration-300 ease-in-out"
        >
          <BsCaretLeft
            className={`w-6 h-6 ${
              currentQuestion === 0
                ? 'fill-gray-400'
                : 'group-hover:fill-blue-500'
            }`}
          />
          <span
            className={`${
              currentQuestion === 0
                ? 'text-gray-400'
                : 'group-hover:text-blue-500'
            }`}
          >
            Sebelumnya
          </span>
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={currentQuestion === answers.length - 1}
          className="flex flex-row items-center justify-start group duration-300 ease-in-out"
        >
          <span
            className={`${
              currentQuestion === answers.length - 1
                ? 'text-gray-400'
                : 'group-hover:text-blue-500'
            }`}
          >
            Selanjutnya
          </span>
          <BsCaretRight
            className={`w-6 h-6 ${
              currentQuestion === answers.length - 1
                ? 'fill-gray-400'
                : 'group-hover:fill-blue-500'
            }`}
          />
        </button>
      </div>

      {/* Divider */}
      <Divider className="bg-black dark:bg-white duration-300 ease-in-out" />

      {/* Question */}
      <ResultQuestion {...resultProps} />
    </div>
  )
}

export default ResultList
