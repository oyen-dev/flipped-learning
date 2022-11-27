import { useGlobal } from '../../contexts/Global'

import { useNavigate } from 'react-router-dom'

import { Form, Input, Button, message } from 'antd'
import api from '../../api'

const ResetPassword = (props) => {
  // Destructure props
  const { token } = props
  console.log(token)

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Navigator
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(values)

    // Check if password and confirm password are the same
    if (values.password.length < 8) {
      message.error('Mohon buat password dengan minimal 8 karakter!')
    } else if (values.password !== values.confirmPassword) {
      message.error('Mohon maaf, password belum sesuai.')
    } else {
      mySwal.fire({
        title: 'Resetting your password...',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        showConfirmButton: false,
        didOpen: () => {
          mySwal.showLoading()
        }
      })

      const payload = {
        password: values.password,
        confirmPassword: values.confirmPassword
      }

      await api.post(`/auth/reset-password?token=${token}`, payload)
        .then((res) => {
          console.log(res.data)
          if (res.data.status) {
            mySwal.fire({
              icon: 'success',
              title: 'Reset Password Success',
              text: 'Kami akan mengarahkan Anda ke halaman login',
              timer: 3000,
              showConfirmButton: false
            }).then(() => {
              navigate('/auth')
            })
          } else {
            mySwal.fire({
              icon: 'error',
              title: 'Reset Password Failed',
              text: res.data.message,
              timer: 3000,
              showConfirmButton: false
            })
          }
        }).catch((err) => {
          console.log(err)
          mySwal.fire({
            icon: 'error',
            title: 'Reset Password Failed',
            text: err.response.data.message,
            timer: 3000,
            showConfirmButton: false
          })
        })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)

    message.error('Please fill in all the fields.')
  }

  return (
    <Form
      name="resetForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <p className="text-white text-base font-normal mb-0">New Password</p>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan password Anda!'
          },
          {
            min: 8,
            message: 'Password minimal 8 karakter!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Confirm Password</p>
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan password Anda!'
          },
          {
            min: 8,
            message: 'Password minimal 8 karakter!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="font-medium">Ubah Password Sekarang</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ResetPassword
