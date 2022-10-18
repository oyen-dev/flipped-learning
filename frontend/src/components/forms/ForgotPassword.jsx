import { useGlobal } from '../../contexts/Global'
import api from '../../api'

import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

const ForgotPassword = () => {
  // Global context
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  //  Navigator
  const navigate = useNavigate()

  const onFinish = async (values) => {
    // Show loadng
    mySwal.fire({
      title: 'Checking your email...',
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    await api.post('/auth/forgot-password', values).then((res) => {
      console.log(res.data)
      if (res.data.status) {
        // Show success message using mySwal
        mySwal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Please check your email to reset your password',
          timer: 5000,
          showConfirmButton: false
        }).then(() => {
          navigate('/auth')
        })
      } else {
        // Show error message using mySwal
        mySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: res.data.message,
          timer: 5000,
          showConfirmButton: false
        })
      }
    }).catch((error) => {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response.data.message,
        timer: 5000,
        showConfirmButton: false
      })
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form name="loginForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <p className="text-white text-sm font-extralight mb-2 text-center">
        Masukkan email Anda, kami akan mengirimkan tautan untuk mereset akun
        Anda.
      </p>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Mohon masukkan email yang valid!'
          },
          {
            required: true,
            message: 'Mohon masukkan email terdaftar Anda!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Kirim Link Reset Password</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ForgotPassword
