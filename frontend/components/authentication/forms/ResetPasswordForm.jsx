import { Button, Form, Input, message } from 'antd'

const ResetPasswordForm = () => {
  const onFinish = (values) => {
    if (values.password.length < 8) {
      message.error('Mohon buat password dengan minimal 8 karakter!')
    } else if (values.password !== values.confirm_password) {
      message.error('Mohon maaf, password belum sesuai.')
    } else {
      console.log('Success:', values)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <p className='text-white text-base font-normal mb-0'>Password</p>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <p className='text-white text-base font-normal mb-0'>Konfirmasi Password</p>
      <Form.Item
        name="confirm_password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
      >
        <Button className='w-full' type="primary" htmlType="submit">
          <p className='text-white font-medium'>Reset Password</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ResetPasswordForm
