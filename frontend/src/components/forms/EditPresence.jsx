import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useManagement } from '../../contexts/Management'

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

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Managemnet States
  const { managementStates } = useManagement()
  const { setFetchPresence } = managementStates

  // Local states
  const [presenceData, setPresenceData] = useState(null)

  // Close modal
  const closeModal = () => {
    // Reset form
    form.resetFields()

    // Modal is from daisyUI, close it
    document.getElementById('modal-presence').checked = false
  }

  // Function disabledHours
  const disabledHours = () => {
    const hours = []
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i)
    }
    return hours
  }

  // Function disabledMinutes
  const disabledMinutes = (selectedHour) => {
    const minutes = []
    if (selectedHour === moment().hour()) {
      for (let i = 0; i < moment().minute(); i++) {
        minutes.push(i)
      }
    }
    return minutes
  }

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
      // console.log(data)

      const { presence } = data.data
      // console.log(presence)
      setPresenceData(presence)
    } catch (error) {
      console.log(error)
    }
  }

  // onFinish
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Memperbarui presensi...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    // Payload data
    const payload = {
      start: moment(values.time[0]).toDate(),
      end: moment(values.time[1]).toDate()
    }

    try {
      const { data } = await api.put(`/class/${classId}/presences`, payload, config)
      console.log(data)

      mySwal.fire({
        icon: 'success',
        title: 'Presensi berhasil diperbarui!',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        setFetchPresence(true)
        closeModal()
      })
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Presensi gagal diperbarui!',
        text: error.response.data.message,
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
          disabledTime={() => ({
            disabledHours,
            disabledMinutes
          })}
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
