import { Form, Input, Button } from 'antd'

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form name="loginForm" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <p className="text-white text-base font-medium mb-0">Email</p>
      <Form.Item
        name="username"
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
        <Input placeholder="Masukkan email Anda" />
      </Form.Item>

      <p className="text-white text-base font-medium mb-0">Password</p>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan password Anda!'
          }
        ]}
      >
        <Input.Password placeholder="Masukkan password Anda" />
      </Form.Item>

      <div className="flex flex-col space-y-1 items-end text-white">
        <p className="text-base font-bold hover:text-blue-500 cursor-pointer duration-150">
          Lupa password?
        </p>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
