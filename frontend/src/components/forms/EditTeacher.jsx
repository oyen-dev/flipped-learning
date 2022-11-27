import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import moment from 'moment'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Select, DatePicker, Skeleton } from 'antd'
import Cookies from 'js-cookie'

const EditTeacher = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Use params
  const { id } = useParams()

  // Local States
  const [teacher, setTeacher] = useState(null)
  const [fetch, setFetch] = useState(false)

  // Fetching teacher data
  const getTeacherDetails = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    const res = await api.get(`/users/teachers/${id}`, config)
    // console.log(res)
    setTeacher(res.data.data)
  }

  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Updating teacher data...',
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

    await api.put(`/users/teachers/${id}`, values, config)
    setFetch(true)

    // Show success
    mySwal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Teacher data has been updated',
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
    getTeacherDetails()
  }, [])

  // Fetch teacher when update
  useEffect(() => {
    if (fetch) {
      getTeacherDetails()
      setFetch(false)
    }
  }, [fetch])

  return (
    <>
      {teacher
        ? (
        <Form
        name="registerForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
        initialValues={{
          fullName: teacher.fullName,
          email: teacher.email,
          phone: teacher.phone,
          gender: teacher.gender,
          dateOfBirth: moment(teacher.dateOfBirth),
          placeOfBirth: teacher.placeOfBirth,
          address: teacher.address
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
            <p className="text-white font-medium">Perbarui Data Guru</p>
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

export default EditTeacher
