import { useState } from 'react'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, message } from 'antd'
import { useParams } from 'react-router-dom'

const { Item } = Form
const { TextArea } = Input

const EditQuestion = (props) => {
  // Props Destructuring
  const { question: questionDetail, closeModal, setFetchEvaluation } = props
  const { question, key, options, _id: questionId } = questionDetail

  // useForm
  const [form] = Form.useForm()

  // useParams
  const { id: classId, evaluationId } = useParams()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [selectedAnswer, setSelectedAnswer] = useState(key)
  const [answers, setAnswers] = useState(options.map((option) => ({ text: option })))

  const handleAnswerChange = (index) => {
    setSelectedAnswer(index)
  }

  // onFinish
  const onFinish = async (values) => {
    // Iterate through answers, if answer is empty show error using message
    let isAnswerEmpty = false
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].text === '') {
        message.error(`Jawaban ${String.fromCharCode(97 + i).toUpperCase()} masih kosong!`)
        isAnswerEmpty = true
        break
      }
    }
    if (isAnswerEmpty) return

    // Check if selected answer is empty
    if (selectedAnswer === null) {
      message.error('Mohon pilih satu jawaban yang benar!')
      return
    }

    // Show loading
    mySwal.fire({
      title: 'Memperbarui pertanyaan...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Payload
    const payload = {
      question: values.question,
      options: answers.map((answer) => answer.text),
      key: parseInt(selectedAnswer)
    }

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      await api.put(`/class/${classId}/evaluations/${evaluationId}/questions/${questionId}`, payload, config)

      // Show success message
      mySwal.fire({
        icon: 'success',
        title: 'Pertanyaan berhasil diperbarui!',
        showConfirmButton: false,
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true
      }).then(() => {
        setFetchEvaluation(true)
        closeModal()
      })
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

  // onFinishFailed
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // Update answer
  const updateAnswer = (index, e) => {
    const newAnswers = [...answers]
    newAnswers[index].text = e.target.value
    setAnswers(newAnswers)
  }

  return (
    <Form
      form={form}
      name="add-question"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="w-full flex-col space-y-4"
      initialValues={{
        question
      }}
    >
      {/* Question */}
      <Item
        name="question"
        rules={[
          {
            required: true,
            message: 'Masukkan pertanyaan!'
          }
        ]}
      >
        <TextArea
          placeholder="Pertanyaan"
          autoSize={{ minRows: 2, maxRows: 5 }}
        />
      </Item>

      {/* Answer */}
      {answers.map((answer, index) => (
        <label
          key={index}
          className="flex flex-row space-x-2 cursor-pointer hover:text-semibold group"
        >
          <input
            type="radio"
            name="answer"
            checked={selectedAnswer === index}
            value={index}
            onChange={() => handleAnswerChange(index)}
            className="mr-2 cursor-pointer"
          />
          <TextArea
            placeholder={`Jawaban ${String.fromCharCode(97 + index).toUpperCase()}`}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onChange={(e) => updateAnswer(index, e)}
            value={answers[index].text}
          />
        </label>
      ))}

      <Item className="w-full flex justify-end">
        <button
          className={
            'py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-black dark:text-white bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4] rounded-lg duration-300 ease-in-out'
          }
        >
          Perbarui Pertanyaan
        </button>
      </Item>
    </Form>
  )
}

export default EditQuestion
