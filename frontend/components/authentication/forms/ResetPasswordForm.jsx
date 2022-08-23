import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <p className='text-white text-base font-medium mb-0'>Password</p>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <p className='text-white text-base font-medium mb-0'>Konfirmasi Password</p>
      <Form.Item
        name="confirm_password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
      >
        <Button className='w-full' type="primary" htmlType="submit">
          <p className='text-white font-semibold'>Reset Password</p>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;