import { useAuth } from '../../contexts/Auth'
import { useGlobal } from '../../contexts/Global'

import { Link, useNavigate } from 'react-router-dom'

import { Form, Input, Button, Checkbox } from 'antd'
import api from '../../api'
import Cookies from 'js-cookie'

const Login = () => {
  // Auth context
  const { authState, authFunctions } = useAuth()
  const { setIsAuthenticated, setJwtToken } = authState
  const { fetchUser } = authFunctions

  // Global context
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Navigator
  const navigate = useNavigate()

  // onFinish
  const onFinish = async (values) => {
    // Show loadng
    mySwal.fire({
      title: 'Logging in...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Payload
    const payload = {
      email: values.email,
      password: values.password,
      remember: values.remember
    }

    try {
      const { data } = await api.post('/auth/login', payload)
      // console.log(data)

      // Set cookie
      const token = data.data.accessToken
      Cookies.set('jwtToken', token, {
        expires: values.remember ? 7 : 1
      })

      // Set jwtToken to state
      setJwtToken(token)
      setIsAuthenticated(true)

      // Fetch user data
      await fetchUser()

      // Show success
      mySwal.fire({
        icon: 'success',
        title: 'Login Success',
        text: 'Anda akan dialihkan ke halaman dashboard...',
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        navigate('/dashboard')
      })
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Login Failed',
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

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  return (
    <Form
      name="loginForm"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <p className="text-white text-base font-normal mb-0">Email</p>
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

      <p className="text-white text-base font-normal mb-0">Password</p>
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

      <Form.Item>
        <div className="flex flex-row justify-between items-center text-white">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox onChange={onChange}>
              <span className="text-base text-white">Ingat saya</span>
            </Checkbox>
          </Form.Item>

          <Link to="/auth/forgot-password">
            <p className="text-base font-semibold mb-0 hover:text-blue-500 cursor-pointer duration-150">
              Lupa password?
            </p>
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="font-medium">Masuk</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
