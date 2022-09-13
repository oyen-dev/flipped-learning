import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  message
} from 'antd'

const AddStudent = () => {
  const onFinish = (values) => {
    console.log('Success:', values)

    message.info('Siap Hit API')
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
            message: 'Mohon masukkan nama lengkap!'
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
            message: 'Mohon masukkan email aktif!'
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
            message: 'Pilih jenis kelamin!'
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
            message: 'Mohon masukkan tanggal lahir!'
          }
        ]}
      >
        <DatePicker onChange={changeDate} className="w-full" />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Tempat Lahir</p>
      <Form.Item
        name="pob"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan tempat lahir!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Alamat</p>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan data alamat!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Tambahkan Data Siswa</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddStudent