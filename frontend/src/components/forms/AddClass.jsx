import { useState, useMemo, useRef } from 'react'
import { useAuth } from '../../contexts/Auth'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select, Spin } from 'antd'
import Cookies from 'js-cookie'

const AddClass = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Local States
  const [teacherList, setTeacherList] = useState([])

  // Navigator
  const navigate = useNavigate()

  const onFinish = async (values) => {
    // console.log('Success:', values)
    const payload = {
      name: values.name,
      grade: values.grade,
      teachers: user.role === 'TEACHER' ? [user._id] : values.teachers.map((teacher) => teacher.value),
      schedule: []
    }

    // Show loading
    mySwal.fire({
      title: 'Creating class...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const res = await api.post('/class', payload, config)
      // console.log(res)
      const { data } = res

      if (data.status) {
        mySwal
          .fire({
            icon: 'success',
            title: 'Class successfully created',
            text: "You'll be redirected to the class page",
            timer: 4000,
            showConfirmButton: false
          })
          .then(() => navigate(data.data._id))
      } else {
        mySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data.message,
          timer: 4000,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
        timer: 4000,
        showConfirmButton: false
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // Usage of debounce
  async function fetchTeachers (name) {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    return await api
      .get(`/users/teachers?q=${name}&limit=20&page=1`, config)
      .then((res) => {
        return res.data.data.teachers.map((teacher) => ({
          label: teacher.fullName,
          value: teacher._id
        }))
      })
  }

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
        name="grade"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan kelas/jenjang!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      {user.role === 'ADMIN' && (
        <>
          <p className="text-white text-base font-normal mb-0">Guru/Pengajar</p>
          <Form.Item
            name="teachers"
            rules={[
              {
                required: true,
                message: 'Mohon masukkan guru/pengajar!'
              }
            ]}
          >
            <DebounceSelect
              mode="multiple"
              value={teacherList}
              placeholder="Nama Guru/Pengajar"
              fetchOptions={fetchTeachers}
              onChange={(newValue) => {
                setTeacherList(newValue)
              }}
            />
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Buat Kelas Baru</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const fetchRef = useRef(0)
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }
        setOptions(newOptions)
        setFetching(false)
      })
    }
    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  )
}

export default AddClass
