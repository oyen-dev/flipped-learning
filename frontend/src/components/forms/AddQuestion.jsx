import { useState } from 'react'

import { Form, Input, message } from 'antd'

const { Item } = Form
const { TextArea } = Input

const AddQuestion = () => {
  // useForm
  const [form] = Form.useForm()

  // Local States
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' }
  ])

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value)
  }

  // onFinish
  const onFinish = (values) => {
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

    const payload = {
      question: values.question,
      options: answers.map((answer) => answer.text),
      key: selectedAnswer
    }

    console.log(payload)
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
            value={index}
            onChange={handleAnswerChange}
            className="mr-2 cursor-pointer"
          />
          <TextArea
            placeholder={`Jawaban ${String.fromCharCode(97 + index).toUpperCase()}`}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onChange={(e) => updateAnswer(index, e)}
          />
        </label>
      ))}

      <Item className="w-full flex justify-end">
        <button
          className={
            'py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-black dark:text-white bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4] rounded-lg duration-300 ease-in-out'
          }
        >
          Tambah Pertanyaan
        </button>
      </Item>
    </Form>
  )
}

export default AddQuestion
