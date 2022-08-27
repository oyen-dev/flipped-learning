import { Form, Input, Button, message } from 'antd'
import Link from 'next/link'

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values)

    message.info(`Email ${values.email} password ${values.password}`)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form name="loginForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div className="flex flex-col space-y-1 items-end text-white">
        <Link href='/auth/forgot-password'>
        <p className="text-base font-semibold hover:text-blue-500 cursor-pointer duration-150">
          Lupa password?
        </p>
        </Link>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className='font-medium'>
          Submit
          </p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
