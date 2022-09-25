import { Form, Input, Button } from 'antd'

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
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
