import { Form, Input, Button, Checkbox, message } from 'antd'
import Link from 'next/link'

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values)

    message.info(`Email ${values.email} password ${values.password}`)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)

    message.error('Login failed')
  }

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
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

      <Form.Item>
        <div className="flex flex-row justify-between items-center text-white">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox defaultChecked={true} checked={true} onChange={onChange} >
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
          <p className="font-medium">Submit</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
