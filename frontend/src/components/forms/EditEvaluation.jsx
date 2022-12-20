import { useGlobal } from '../../contexts/Global'
import momentId from '../../constants/momentId'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, DatePicker } from 'antd'
import moment from 'moment/moment'
import { useParams } from 'react-router-dom'

moment.updateLocale('id', momentId)
const { Item } = Form

const EditEvaluation = (props) => {
  // Props Destructuring
  const { evaluation, setFetchEvaluation } = props

  // useForm
  const [form] = Form.useForm()

  // useParams
  const { id: classId, evaluationId } = useParams()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Disabled Date
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('days')
  }

  // onFinish
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Memperbarui evaluasi.',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Payload
    const payload = {
      title: values.title,
      deadline: {
        start: moment(),
        end: moment(values.deadline)
      }
    }

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      await api.put(`/class/${classId}/evaluations/${evaluationId}`, payload, config)
      // console.log(data)

      // Show success message
      mySwal.fire({
        icon: 'success',
        title: 'Evaluasi berhasil diperbarui!',
        showConfirmButton: false,
        backdrop: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true
      }).then(() => setFetchEvaluation(true))

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
      name="editEvaluationForm"
      className="w-full"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      initialValues={{
        title: evaluation.title,
        deadline: moment(evaluation.deadline.end)
      }}
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
          Perbarui Evaluasi
        </button>
      </Item>
    </Form>
  )
}

export default EditEvaluation
