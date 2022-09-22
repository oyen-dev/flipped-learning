import Link from 'next/link'
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox, message } from 'antd'
import api from '../../api'
import { globalStateContext } from '../../contexts/ContextProvider'
import Cookies from 'js-cookie'

const Login = () => {
  const router = useRouter()
  // Global State
  const { authStates, globalFunctions } = globalStateContext()
  const { setIsAuthenticated } = authStates
  const { MySwal } = globalFunctions

  const onFinish = async (values) => {
    // Show loadng using MySwal
    MySwal.fire({
      title: 'Logging you in...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading()
      }
    })
    await api
      .post('/auth/login', {
        email: values.email,
        password: values.password,
        remember: values.remember
      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.status) {
          Cookies.set('jwtToken', res.data.data.accessToken, {
            expires: res.data.expiresIn === '86400' ? 1 : 7
          })
          setIsAuthenticated(true)

          // Show success message using MySwal
          MySwal.fire({
            icon: 'success',
            title: 'Login Success',
            text: 'You will be redirected to the dashboard',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            router.push('/dashboard')
          })
        } else {
          // message.error(res.data.message)
          // Show error message using MySwal
          MySwal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: res.data.message,
            timer: 2000,
            showConfirmButton: false
          })
        }
      })
      .catch((error) => {
        console.log(error)
        MySwal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.response.data.message,
          timer: 2000,
          showConfirmButton: false
        })
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)

    message.error('Login failed')
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

          <Link href="/auth/forgot-password">
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
