import { useState, useEffect } from 'react'

import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import moment from 'moment'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Select, DatePicker, Skeleton } from 'antd'
import Cookies from 'js-cookie'

const EditStudent = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Use params
  const { id } = useParams()

  // Local States
  const [student, setStudent] = useState(null)
  const [fetch, setFetch] = useState(false)

  // Fetching student data
  const getStudentDetails = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    const res = await api.get(`/users/students/${id}`, config)
    // console.log(res)
    setStudent(res.data.data)
  }

  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Memperbarui data siswa...',
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    await api.put(`/users/students/${id}`, values, config)
    setFetch(true)

    // Show success
    mySwal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Data siswa berhasil diperbarui',
      timer: 3000,
      showConfirmButton: false
    })
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

  // Fetch student when update
  useEffect(() => {
    if (fetch) {
      getStudentDetails()
      setFetch(false)
    }
  }, [fetch])

  return (
    <>
      {student
        ? (
        <Form
        name="registerForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
        initialValues={{
          fullName: student.fullName,
          email: student.email,
          phone: student.phone,
          gender: student.gender,
          dateOfBirth: moment(student.dateOfBirth),
          placeOfBirth: student.placeOfBirth,
          address: student.address
        }}
      >
        <p className="text-white text-base font-normal mb-0">Nama Lengkap</p>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama lengkap!'
            }
          ]}
        >
          <Input />
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
          <Select >
            <Select.Option value={true}>Laki</Select.Option>
            <Select.Option value={false}>Perempuan</Select.Option>
          </Select>
        </Form.Item>

        <p className="text-white text-base font-normal mb-0">Tanggal Lahir</p>
        <Form.Item
          name="dateOfBirth"
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
          name="placeOfBirth"
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
            <p className="text-white font-medium">Perbarui Data Siswa</p>
          </Button>
        </Form.Item>
      </Form>
          )
        : (
          <Skeleton
            active
            paragraph={{ rows: 5 }}
          />
          )}
    </>
  )
}

export default EditStudent
