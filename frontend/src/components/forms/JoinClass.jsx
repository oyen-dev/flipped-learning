import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import Cookies from 'js-cookie'

const JoinClass = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Navigator
  const navigate = useNavigate()

  const onFinish = async (values) => {
    // console.log('Success:', values)
    const payload = {
      invitation: values.invitation,
      join: true
    }

    // Show loading
    mySwal.fire({
      title: 'Joining class...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.post('/class/join', payload, config)
      console.log(data)

      mySwal.fire({
        icon: 'success',
        title: data.message,
        text: "You'll be redirected to the class page",
        timer: 3000,
        showConfirmButton: false
      }).then(() => navigate(data.data._id))
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
        timer: 3000,
        showConfirmButton: false
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="joinClassForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-full"
    >
      <p className="text-black dark:text-white text-base font-normal mb-0">
        Kode Undangan Kelas
      </p>
      <Form.Item
        name="invitation"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan kode undangan kelas'
          },
          {
            min: 5,
            message: 'Kode undangan kelas terdiri dari 5 karakter'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Gabung Kelas</p>
        </Button>
      </Form.Item>
    </Form>
  )
}
export default JoinClass
