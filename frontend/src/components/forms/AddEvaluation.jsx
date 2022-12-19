import { useGlobal } from '../../contexts/Global'

import momentId from '../../constants/momentId'
import api from '../../api'

import { Form, Input, DatePicker } from 'antd'
import moment from 'moment/moment'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router-dom'

moment.updateLocale('id', momentId)
const { Item } = Form

const AddEvaluation = () => {
  // useParams
  const { id: classId } = useParams()

  // useNavigate
  const navigate = useNavigate()

  // useForm
  const [form] = Form.useForm()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('days')
  }

  // onFinish
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Creating Evaluation...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Payload
    const payload = {
      title: values.title,
      questions: [],
      deadline: {
        start: moment(),
        end: values.deadline
      }
    }

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.post(`/class/${classId}/evaluations`, payload, config)
      const { _id } = data.data
      //   console.log(data)

      // Show success message
      mySwal.fire({
        icon: 'success',
        title: 'Evaluation created successfully!',
        showConfirmButton: false,
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true
      }).then(() => navigate(`evaluations/${_id}/edit`))

      // Reset form
      form.resetFields()
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

  return (
    <Form
      form={form}
      name="addEvaluation"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="w-full"
    >
      <Item
        name={'title'}
        rules={[
          {
            required: true,
            message: 'Judul evaluasi tidak boleh kosong'
          }
        ]}
      >
        <Input placeholder="Judul Evaluasi" />
      </Item>

      <Item
        name="deadline"
        rules={[
          {
            required: true,
            message: 'Mohon atur tengat penugasan!'
          }
        ]}
        className="w-full"
      >
        <DatePicker
          placeholder="Tengat evaluasi"
          disabledDate={disabledDate}
          format={'DD MMMM YYYY: HH:mm'}
          showTime
          className="w-full"
        />
      </Item>

      <Item className="w-full flex justify-end">
        <button
          className={
            'py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-black dark:text-white bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4] rounded-lg duration-300 ease-in-out'
          }
        >
          Buat Evaluasi
        </button>
      </Item>
    </Form>
  )
}

export default AddEvaluation
