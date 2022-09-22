import { useState } from 'react'

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  message
} from 'antd'

const AddTeacherForm = () => {
  // Local state
  const [assignClass, setAssignClass] = useState(false)

  // Option for select
  const { Option } = Select

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

  const changeAssign = (e) => {
    setAssignClass(e.target.checked)
  }

  const assignClasses = (value) => {
    console.log(`selected ${value}`)
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

      {assignClass && (
        <>
          <p className="text-white text-base font-normal mb-0">Kelas Diampu</p>
          <Form.Item
            name="classes"
            rules={[
              {
                required: true,
                message: 'Mohon pilih kelas yang akan diampu!'
              }
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Pilih kelas yang akan diampu"
              onChange={assignClasses}
            >
              <Option title="Pemrograman Dasar" value="Pemdas" />
              <Option title="Pemrograman Berorientasi Objek" value="PBO" />
              <Option title="Algoritma dan Strukur Data" value="ASD" />
            </Select>
          </Form.Item>
        </>
      )}

      <div className="flex flex-row items-start justify-start space-x-4 text-white">
        <Form.Item name="agree" valuePropName="checked">
          <div className="flex flex-row space-x-4">
            <Checkbox onChange={changeAssign} />
            <p className="text-sm justify-center items-center mb-0 text-justify text-white">
              Tugaskan guru ini untuk mengajar kelas?
            </p>
          </div>
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Tambahkan Data Guru</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddTeacherForm
