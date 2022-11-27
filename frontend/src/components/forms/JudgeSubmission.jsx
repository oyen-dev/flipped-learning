import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { Form, Input } from 'antd'

const { Item } = Form
const { TextArea } = Input

const JudgeSubmission = (props) => {
  // Props destructuring
  const { feedback, points, _id } = props

  // useParams
  const { id: classId, postId } = useParams()

  // Global functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Handle finish
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Submitting your feedback...',
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
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

    // Payload data
    const payload = {
      points: values.points,
      feedback: values.feedback === '' || values.feedback === undefined ? null : values.feedback
    }

    // Post data
    try {
      console.log(`/class/${classId}/post/${postId}/submission/${_id}`)
      const { data } = await api.put(`/class/${classId}/posts/${postId}/submissions/${_id}`, payload, config)
      console.log(data)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: 'Done',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
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

  // Handle finish failed
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
        name='judgeSubmission'
        className='w-full'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          feedback,
          points
        }}
    >
        {/* Points */}
        <Item
            name='points'
            rules={[
              {
                required: true,
                message: 'Mohon masukkan nilai!'
              },
              {
                min: 0,
                max: 100
              },
              {
                validator: (_, value) => {
                  if (value > 100) {
                    return Promise.reject(new Error('Nilai maksimal adalah 100!'))
                  }
                  return Promise.resolve()
                }
              },
              {
                validator: (_, value) => {
                  if (value < 0) {
                    return Promise.reject(new Error('Nilai minimal adalah 0!'))
                  }
                  return Promise.resolve()
                }
              }
            ]}
        >
            {/* Input type number */}
            <Input type='number' placeholder='Nilai'/>
        </Item>

        {/* Feedback */}
        <Item
          name='feedback'
          rules={[
            {
              required: false
            },
            {
              validator: (_, value) => {
                value = value === null ? '' : value
                if (value.length > 1000) {
                  return Promise.reject(new Error('Feedback maksimal adalah 1000 karakter!'))
                }
                return Promise.resolve()
              }
            }
          ]}
        >
            <TextArea
                placeholder='Feedback'
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Item>

        {/* Submit button */}
        <div className="w-full flex flex-row justify-between">
          <Form.Item className="w-full flex justify-end">
            <button
              className={'py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-black dark:text-white bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4] rounded-lg duration-300 ease-in-out'}
            >
              {points === null ? 'Beri Nilai' : 'Perbarui Nilai'}
            </button>
          </Form.Item>
        </div>

    </Form>
  )
}

export default JudgeSubmission
