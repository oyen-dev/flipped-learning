import { useAuth } from '../../contexts/Auth'
import { useGlobal } from '../../contexts/Global'

import { Link, useNavigate } from 'react-router-dom'

import { Form, Input, Button, Checkbox, message } from 'antd'
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

  const onFinish = async (values) => {
    // console.log(values)
    // Show loadng
    mySwal.fire({
      title: 'Logging you in...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    await logIn(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)

    message.error('Login failed')
  }

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  const logIn = async (values) => {
    await api.post('/auth/login', {
      email: values.email,
      password: values.password,
      remember: values.remember
    }).then(async (res) => {
      // console.log(res.data.data)
      if (res.data.status) {
        // Set jwtToken to cookies
        const token = res.data.data.accessToken
        Cookies.set('jwtToken', token, {
          expires: values.remember ? 7 : 1
        })

        // Set jwtToken to state
        setJwtToken(token)
        setIsAuthenticated(true)

        // Fetch user data
        await fetchUser(token)

        // Show success message using mySwal
        mySwal.fire({
          icon: 'success',
          title: 'Login Success',
          text: 'You will be redirected to the dashboard',
          timer: 2000,
          showConfirmButton: false
        }).then(async () => {
          navigate('/dashboard')
        })
      } else {
        // Show error message using mySwal
        mySwal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: res.data.message,
          timer: 2000,
          showConfirmButton: false
        })
      }
    }).catch((error) => {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response.data.message,
        timer: 2000,
        showConfirmButton: false
      })
    })
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
          <p className="font-medium">Login</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
