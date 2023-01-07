import { useGlobal } from '../../contexts/Global'
import { useManagement } from '../../contexts/Management'

import api from '../../api'

import moment from 'moment/moment'
import Cookies from 'js-cookie'
import { Form, TimePicker, Button } from 'antd'
import { useParams } from 'react-router-dom'

const { Item } = Form
const { RangePicker } = TimePicker

const OpenPresence = () => {
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

  // Close modal
  const closeModal = () => {
    // Reset form
    form.resetFields()

    // Modal is from daisyUI, close it
    document.getElementById('modal-presence').checked = false
  }

  // onFinish
  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Membuka presensi...',
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
      const { data } = await api.post(`/class/${classId}/presences`, payload, config)
      console.log(data)

      mySwal.fire({
        icon: 'success',
        title: 'Presensi berhasil dibuka!',
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
        title: 'Presensi gagal dibuka!',
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
          disabledTime={() => ({
            disabledHours,
            disabledMinutes
          })}
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
