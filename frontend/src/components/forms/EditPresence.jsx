import { useState, useEffect } from 'react'

import api from '../../api'

import moment from 'moment/moment'
import Cookies from 'js-cookie'
import { Form, TimePicker, Button, Spin } from 'antd'
import { useParams } from 'react-router-dom'

const { Item } = Form
const { RangePicker } = TimePicker

const EditPresence = () => {
  // useForm
  const [form] = Form.useForm()

  // useParams
  const { id: classId } = useParams()

  // Local states
  const [presenceData, setPresenceData] = useState(null)

  const checkPresence = async () => {
    // Reset isPresenceOpen
    setPresenceData(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/presences/current`, config)
      console.log(data)

      const { presence } = data.data
      console.log(presence)
      setPresenceData(presence)
    } catch (error) {
      console.log(error)
    }
  }

  // onFinish
  const onFinish = (values) => {
    console.log(values)
  }

  // onFinishFailed
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // Initially check presence
  useEffect(() => {
    checkPresence()
  }, [])

  return (
    <>
    {presenceData === null
      ? <Spin size='default' />
      : <Form
      name="edit-presence"
      form={form}
      className="w-full"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        time: [moment(presenceData.start), moment(presenceData.end)]
      }}
    >
      {/* TimeRange Picker */}
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
      {/* Button */}
      <Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="font-medium">Perbarui Presensi</p>
        </Button>
      </Item>
    </Form>
    }
    </>
  )
}

export default EditPresence
