import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import Cookies from 'js-cookie'

const { Option } = Select

const AddClass = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [teacherList, setTeacherList] = useState([])
  const [fetchTeacher, setFetchTeacher] = useState(false)
  const [search, setSearch] = useState('')

  // Navigator
  const navigate = useNavigate()

  const onTeacherChange = (value) => {
    if (value === '') {
      setSearch('')
    } if (value.length % 3 === 0) {
      setSearch(value)
      fetchTeacherList()
    }
  }

  const onFinish = async (values) => {
    console.log('Success:', values)
    // Show loading
    // mySwal.fire({
    //   title: 'Creating class...',
    //   showConfirmButton: false,
    //   didOpen: () => {
    //     mySwal.showLoading()
    //   }
    // })

    // await createClass(values)
  }

  const fetchTeacherList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    setFetchTeacher(true)
    await api.get(`/users/teachers?q=${search}&limit=20&page=1`, config).then((res) => {
      setTeacherList(res.data.data)
      setFetchTeacher(false)
    }).catch(() => {
      setFetchTeacher(false)
    })
  }

  const createClass = async (values) => {
    await api.post('/classes', {
      name: values.name,
      class: values.class
    }).then((res) => {
      console.log(res.data)

      if (res.data.statusCode === 201) {
        // Show success message using mySwal
        mySwal.fire({
          icon: 'success',
          title: 'Created class successfully',
          text: "You'll be redirected to the class page",
          timer: 4000,
          showConfirmButton: false
        }).then(async () => {
          // Todo : Redirect to class page
          navigate(res.data.data._id)
        })
      } else {
        // Show error message using mySwal
        mySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data.message,
          timer: 4000,
          showConfirmButton: false
        })
      }
    }).catch((err) => {
      console.log(err)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message,
        timer: 4000,
        showConfirmButton: false
      })
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // Initial fetch teacher list
  useEffect(() => {
    fetchTeacherList()
  }, [])

  // Reset teacher list when search is empty
  useEffect(() => {
    if (search === '') {
      fetchTeacherList()
    }
  }, [search])

  return (
    <Form
      name="addClassForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-full"
    >
      <p className="text-white text-base font-normal mb-0">
        Nama Kelas/Mata Pelajaran
      </p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan nama kelas/mata pelajaran'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Kelas/Jenjang</p>
      <Form.Item
        name="class"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan kelas/jenjang!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Guru/Pengajar</p>
      <Form.Item
        name="teacher"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan guru/pengajar!'
          }
        ]}
      >
        <Select
          mode='multiple'
          showSearch
          placeholder="Search to Select"
          onSearch={onTeacherChange}
          loading={false}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLocaleLowerCase())
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {teacherList.map((teacher) => (
            <Option key={teacher._id} value={teacher._id} >{teacher.fullName}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Buat Kelas Baru</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddClass
