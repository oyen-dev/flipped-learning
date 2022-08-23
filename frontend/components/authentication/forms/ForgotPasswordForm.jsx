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
      <p className="text-white text-base font-light mb-0 text-center">Masukkan email Anda, kami akan mengirimkan tautan untuk mereset akun Anda.</p>
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

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
         <p className='text-white font-semibold'>Kirim Link Reset Password</p> 
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
