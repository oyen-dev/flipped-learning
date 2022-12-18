import momentId from '../../constants/momentId'

import { Form, Input, DatePicker } from 'antd'
import moment from 'moment/moment'

moment.updateLocale('id', momentId)
const { Item } = Form

const EditEvaluation = (props) => {
  // Props Destructuring
  const { evaluation } = props

  // Disabled Date
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('days')
  }

  // onFinish
  const onFinish = (values) => {
    console.log('Success:', values)
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
