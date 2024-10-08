// import { useState } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useManagement } from '../../contexts/Management'
import api from '../../api'

import Cookies from 'js-cookie'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker
  // Checkbox,
} from 'antd'

const AddTeacher = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Management States
  const { managementStates } = useManagement()
  const { setIsFetchTeacher } = managementStates

  // Form
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    console.log('Success:', values)

    // Show loading modal
    mySwal.fire({
      html: 'Mohon tunggu...',
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

    await api.post('/users/teachers', values, config)
      .then(res => {
        console.log(res)
        mySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data guru berhasil ditambahkan',
          showConfirmButton: false,
          timer: 3000
        }).then(() => closeModal())
      }).catch(err => {
        console.log(err)
        mySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Data guru gagal ditambahkan',
          showConfirmButton: false,
          timer: 3000
        }).then(() => closeModal())
      })

    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const changeDate = (date, dateString) => {
    console.log(date, dateString)
  }

  // Close daisy ui modal
  const closeModal = () => {
    const modal = document.getElementById('my-modal-create')
    modal.checked = false
    setIsFetchTeacher(true)
  }

  return (
    <Form
      form={form}
      name="registerForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <p className="text-black dark:text-white text-base font-normal mb-0">Nama Lengkap</p>
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

      <p className="text-black dark:text-white text-base font-normal mb-0">Email</p>
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

      <p className="text-black dark:text-white text-base font-normal mb-0">Jenis Kelamin</p>
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
          <Select.Option value={true}>Laki</Select.Option>
          <Select.Option value={false}>Perempuan</Select.Option>
        </Select>
      </Form.Item>

      <p className="text-black dark:text-white text-base font-normal mb-0">Tanggal Lahir</p>
      <Form.Item
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan tanggal lahir!'
          }
        ]}
      >
        <DatePicker onChange={changeDate} format={'DD/MM/YYYY'} className="w-full" />
      </Form.Item>

      <p className="text-black dark:text-white text-base font-normal mb-0">Tempat Lahir</p>
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

      <p className="text-black dark:text-white text-base font-normal mb-0">Alamat</p>
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
          <p className="text-white font-medium">Tambahkan Data Guru</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddTeacher
