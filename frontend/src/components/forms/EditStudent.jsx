import { useState, useEffect } from 'react'

import api from '../../api'

import moment from 'moment'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Select, DatePicker, message } from 'antd'
import Cookies from 'js-cookie'

const EditStudent = () => {
  // Use params
  const { id } = useParams()

  const [student, setStudent] = useState(null)

  // Fetching student data
  const getStudentDetails = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    await api.get(`users/students/${id}`, config)
      .then((res) => {
        // console.log(res)
        setStudent(res.data.data)
      })
  }
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

  // Initail fetch data
  useEffect(() => {
    getStudentDetails()
  }, [])

  return (
    <>
      {student && (
        <Form
        name="registerForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
        initialValues={{
          name: student.fullName,
          email: student.email,
          phone: student.phone,
          gender: student.gender,
          dob: moment(student.dateOfBirth),
          pob: student.placeOfBirth,
          address: student.address
        }}
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
          <Input defaultValue={student.fullName} />
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
          <Input defaultValue={student.email} />
        </Form.Item>

        <p className="text-white text-base font-normal mb-0">Phone</p>
        <Form.Item
          name="phone"
          rules={[
            {
              required: false,
              message: 'Mohon masukkan data nomor telepon!'
            }
          ]}
        >
          <Input defaultValue={student.phone} />
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
          <Select defaultValue={student.gender}>
            <Select.Option value={true}>Laki</Select.Option>
            <Select.Option value={false}>Perempuan</Select.Option>
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
          <DatePicker
            onChange={changeDate}
            className="w-full"
          />
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
          <Input defaultValue={student.placeOfBirth} />
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
          <Input defaultValue={student.address} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            <p className="text-white font-medium">Perbarui Data Siswa</p>
          </Button>
        </Form.Item>
      </Form>
      )}
    </>
  )
}

export default EditStudent
