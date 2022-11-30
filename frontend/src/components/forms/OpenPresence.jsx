import { Form, TimePicker, Button } from 'antd'

const { Item } = Form
const { RangePicker } = TimePicker

const OpenPresence = () => {
  // useForm
  const [form] = Form.useForm()

  // onFinish
  const onFinish = (values) => {
    console.log(values)
  }

  // onFinishFailed
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="open-presence"
      form={form}
      className="w-full"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* TimeRangePicker */}
      <p className="text-black dark:text-white duration-300 ease-in-out text-base font-normal mb-0">Batas Presensi</p>
      <Item
        name="time"
        rules={[
          {
            required: true,
            message: 'Waktu tidak boleh kosong'
          }
        ]}
      >
        <RangePicker
          placeholder={['Waktu Mulai', 'Waktu Selesai']}
          format="HH:mm"
          className="w-full"
        />
      </Item>

      {/* Button */}
      <Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="font-medium">Buka Presensi</p>
        </Button>
      </Item>
    </Form>
  )
}

export default OpenPresence
