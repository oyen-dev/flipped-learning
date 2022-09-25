import { PrivacyPolicy } from '../modals'

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  message
} from 'antd'

const Register = () => {
  const onFinish = (values) => {
    console.log('Success:', values)

    if (!values.agree) {
      message.error(
        'Mohon setujui ketentuan penggunaan dan kebijakan privasi!'
      )
    } else if (values.password.length < 8) {
      message.error('Mohon buat password dengan minimal 8 karakter!')
    } else if (values.password !== values.confirm_password) {
      message.error('Mohon maaf, password belum sesuai.')
    } else {
      message.info('Siap Hit API')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const changeDate = (date, dateString) => {
    console.log(date, dateString)
  }
  return (
    <Form
      name="registerForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <p className="text-white text-base font-normal mb-0">Nama Lengkap</p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan nama lengkap Anda!'
          }
        ]}
      >
        <Input />
      </Form.Item>

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
            message: 'Mohon masukkan email aktif Anda!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Jenis Kelamin</p>
      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
            message: 'Pilih jenis kelamin Anda!'
          }
        ]}
      >
        <Select>
          <Select.Option value="Laki-laki">Laki</Select.Option>
          <Select.Option value="Perempuan">Perempuan</Select.Option>
        </Select>
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Tanggal Lahir</p>
      <Form.Item
        name="dob"
        rules={[
          {
            required: true,
            message: 'Masukkan tanggal lahir Anda!'
          }
        ]}
      >
        <DatePicker onChange={changeDate} className="w-full" />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Alamat</p>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan data alamat Anda!'
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
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">
        Konfirmasi Password
      </p>
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

      <div className="flex flex-row items-start justify-start space-x-4 text-white">
        <Form.Item name="agree" valuePropName="checked">
          <div className="flex flex-row space-x-4">
            <Checkbox />
            <p className="text-sm justify-center text-justify text-white">
              Dengan mencentang kotak ini, saya menyetujui{' '}
              <label
                htmlFor="modal-privacy-policy"
                className="modal-button font-bold hover:text-blue-500 duration-150 cursor-pointer"
              >
                Ketentuan Penggunaan
              </label>{' '}
              dan{' '}
              <label
                htmlFor="modal-privacy-policy"
                className="modal-button font-bold hover:text-blue-500 duration-150 cursor-pointer"
              >
                Kebijakan Privasi
              </label>{' '}
              Flipped Learning.
            </p>
          </div>
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Daftar Flipped Learning</p>
        </Button>
      </Form.Item>

      {/* Modal container */}
      <input
        type="checkbox"
        id="modal-privacy-policy"
        className="modal-toggle"
      />
      <PrivacyPolicy />
    </Form>
  )
}

export default Register
