import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  message
} from 'antd'

const RegisterForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values)

    if (!values.agree) {
      message.error(
        'Mohon setujui ketentuan penggunaan dan kebijakan privasi!'
      )
    } else if (values.password.length < 8) {
      message.error('Mohon buat password dengan minimal 8 karakter!')
    } else if (values.password !== values.confirm_password) {
      message.error('Mohon maaf, passwrod belum sesuai.')
    } else {
      console.log('Send API')
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
      <p className="text-white text-base font-medium mb-0">Nama Lengkap</p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan nama lengkap Anda!'
          }
        ]}
      >
        <Input placeholder="Nama Lengkap" />
      </Form.Item>

      <p className="text-white text-base font-medium mb-0">Email</p>
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
        <Input placeholder="Email" />
      </Form.Item>

      <p className="text-white text-base font-medium mb-0">Jenis Kelamin</p>
      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
            message: 'Pilih jenis kelamin Anda!'
          }
        ]}
      >
        <Select placeholder="Jenis Kelamin">
          <Select.Option value="Laki-laki">Laki</Select.Option>
          <Select.Option value="Perempuan">Perempuan</Select.Option>
        </Select>
      </Form.Item>

      <p className="text-white text-base font-medium mb-0">Tanggal Lahir</p>
      <Form.Item
        name="dob"
        rules={[
          {
            required: true,
            message: 'Masukkan tanggal lahir Anda!'
          }
        ]}
      >
        <DatePicker
          onChange={changeDate}
          className="w-full"
          placeholder="Tanggal Lahir"
        />
      </Form.Item>

      <p className="text-white text-base font-medium mb-0">Alamat</p>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan data alamat Anda!'
          }
        ]}
      >
        <Input placeholder="Alamat" />
      </Form.Item>

      <p className="text-white text-base font-medium mb-0">Password</p>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <p className="text-white text-base font-medium mb-0">
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
        <Input.Password placeholder="Konfirmasi Password" />
      </Form.Item>

      <div className="flex flex-row items-start justify-start space-x-4 text-white">
        <Form.Item name="agree" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <p className="text-sm justify-center text-justify">
          Dengan mencentang kotak ini, saya menyetujui{' '}
          <span className="font-bold hover:text-blue-500 duration-150 cursor-pointer">
            Ketentuan Penggunaan
          </span>{' '}
          dan{' '}
          <span className="font-bold hover:text-blue-500 duration-150 cursor-pointer">
            Kebijakan Privasi
          </span>{' '}
          Flipped Learning.
        </p>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Daftar Flipped Learning
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
