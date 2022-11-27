import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'

import moment from 'moment'
import { Form, Input, Button, Select, DatePicker, Skeleton } from 'antd'
import Cookies from 'js-cookie'

const EditUser = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth Functions
  const { authFunctions } = useAuth()
  const { fetchUser } = authFunctions

  // Local States
  const [userData, setUserData] = useState(null)
  const [fetch, setFetch] = useState(false)

  // Fetching user data
  const getUserDetails = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    const res = await api.get('/users/profile', config)
    // console.log(res)
    setUserData(res.data.data)
  }

  const onFinish = async (values) => {
    // Show loading
    mySwal.fire({
      title: 'Updating profile data...',
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

    await api.put('/users/profile', values, config)
    setFetch(true)
    fetchUser()

    // Show success
    mySwal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Profile has been updated',
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
    getUserDetails()
  }, [])

  // Fetch user when update
  useEffect(() => {
    if (fetch) {
      getUserDetails()
      setFetch(false)
    }
  }, [fetch])

  return (
    <>
      {userData
        ? (
        <Form
        name="registerForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
        initialValues={{
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          gender: userData.gender,
          dateOfBirth: moment(userData.dateOfBirth),
          placeOfBirth: userData.placeOfBirth,
          address: userData.address
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
            <p className="text-white font-medium">Perbarui Profil</p>
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

export default EditUser
