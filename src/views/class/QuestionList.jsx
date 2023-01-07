import { useState } from 'react'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'
import { EvaluationHeader, ExamQuestion } from '../../components/card'

import { BsCaretLeft, BsCaretRight } from 'react-icons/bs'
import { Divider, message } from 'antd'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router-dom'

const QuestionList = (props) => {
  // Props Destructuring
  const { evaluation, answers, setAnswers } = props

  // useParams
  const { id: classId, evaluationId } = useParams()

  // useNavigate
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [question, setQuestion] = useState(answers[currentQuestion])
  const examProps = {
    question,
    answers,
    setAnswers
  }

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < answers.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setQuestion(answers[currentQuestion + 1])
    }
  }

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setQuestion(answers[currentQuestion - 1])
    }
  }

  // Submit evaluation
  const submitEvaluation = async () => {
    // Show loading
    mySwal.fire({
      title: 'Mengirimkan jawaban...',
      allowEscapeKey: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Answer payload
    const payload = {
      answers: answers.map((answer) => {
        return {
          questionId: answer.question._id,
          answer: answer.answer
        }
      }),
      reaction: 5
    }

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      await api.post(`/class/${classId}/evaluations/${evaluationId}/submit`, payload, config)
      // console.log(data)

      // Show success message
      mySwal.fire({
        icon: 'success',
        title: 'Jawaban berhasil dikirimkan',
        showConfirmButton: false,
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true
      }).then(() => navigate('result'))
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

  // Dialog submit evaluation
  const dialogSubmitEvaluation = () => {
    // Check all questions are answered
    let questionNumber = -1
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].answer === null) {
        questionNumber = i + 1
        break
      }
    }
    if (questionNumber !== -1) {
      message.error(`Kamu belum menjawab pertanyaan nomor ${questionNumber}`)
      return
    }

    mySwal.fire({
      icon: 'warning',
      title: 'Apakah kamu yakin?',
      text: 'Pengerjaan evaluasi akan selesai dan tidak dapat diubah lagi',
      showCancelButton: true,
      confirmButtonText: 'Ya, kumpulkan!',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Batal',
      cancelButtonColor: '#d33',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        submitEvaluation()
      }
    })
  }

  return (
    <div className="flex flex-col w-full space-y-4">
      <EvaluationHeader {...evaluation} />

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
      <ExamQuestion {...examProps} />

      {/* Button Submit */}
      <div className="flex flex-row justify-end items-center">
        {currentQuestion === answers.length - 1 && (
          <button
          onClick={dialogSubmitEvaluation}
            className={
              'py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium rounded-lg duration-300 ease-in-out bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4]'
            }
          >
            Kumpulkan Jawaban
          </button>
        )}
      </div>
    </div>
  )
}

export default QuestionList
