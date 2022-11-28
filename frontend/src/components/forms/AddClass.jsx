import { useState, useMemo, useRef } from 'react'
import { useAuth } from '../../contexts/Auth'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select, Spin, TimePicker } from 'antd'
import { RiIndeterminateCircleLine, RiAddCircleLine } from 'react-icons/ri'
import Cookies from 'js-cookie'
import moment from 'moment'

const { RangePicker } = TimePicker
const { Item, List } = Form
const AddClass = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Local States
  const [teacherList, setTeacherList] = useState([])
  const [days] = useState([
    { value: 1, label: 'Senin' },
    { value: 2, label: 'Selasa' },
    { value: 3, label: 'Rabu' },
    { value: 4, label: 'Kamis' },
    { value: 5, label: 'Jumat' },
    { value: 6, label: 'Sabtu' }
  ])

  // Navigator
  const navigate = useNavigate()

  // Define day of week
  const defineDayOfWeek = (currentDate, target) => {
    currentDate = new Date(currentDate)

    const day = currentDate.getDay()
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : target)
    return new Date(currentDate.setDate(diff))
  }

  // Handle mapping schedule
  const mapSchedule = (schedules) => {
    return schedules.map((schedule) => {
      const day = defineDayOfWeek(new Date(), schedule.day)
      const time = schedule.time

      const timeStart = moment(time[0]).toDate()
      const timeEnd = moment(time[1]).toDate()

      // Modify timeStart date with start date
      timeStart.setDate(day.getDate())
      timeStart.setMonth(day.getMonth())
      timeStart.setFullYear(day.getFullYear())

      // Modify timeEnd date with start date
      timeEnd.setDate(day.getDate())
      timeEnd.setMonth(day.getMonth())
      timeEnd.setFullYear(day.getFullYear())
      return {
        start: timeStart,
        end: timeEnd
      }
    })
  }

  const onFinish = async (values) => {
    // console.log('Success:', values)
    const payload = {
      name: values.name,
      grade: values.grade,
      teachers:
        user.role === 'TEACHER'
          ? [user._id]
          : values.teachers.map((teacher) => teacher.value),
      schedule: !values.schedule
        ? []
        : mapSchedule(values.schedule)
    }

    console.log(payload)

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
            timer: 2000,
            showConfirmButton: false
          })
          .then(() => navigate(data.data._id))
      } else {
        mySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data.message,
          timer: 2000,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
        timer: 3000,
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
      <Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan nama kelas/mata pelajaran'
          }
        ]}
      >
        <Input />
      </Item>

      <p className="text-white text-base font-normal mb-0">Kelas/Jenjang</p>
      <Item
        name="grade"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan kelas/jenjang!'
          }
        ]}
      >
        <Input />
      </Item>

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

      <p className="text-white text-base font-normal mb-0">Jadwal Kelas</p>
      <List name="schedule">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div key={field.key} className="flex flex-row w-full">
                <div className="flex flex-row w-full space-x-4 items-start">

                  {/* Hari */}
                  <div className="flex w-2/12">
                    <Item
                      {...field}
                      name={[field.name, 'day']}
                      fieldKey={[field.fieldKey, 'day']}
                      className="w-full"
                      rules={[
                        {
                          required: true,
                          message: 'Mohon pilih hari!'
                        }
                      ]}
                    >
                      <Select
                        options={days}
                        placeholder="Pilih Hari"
                      />
                    </Item>
                  </div>

                  {/* Jam */}
                  <div className="flex w-8/12">
                    <Item
                      {...field}
                      name={[field.name, 'time']}
                      fieldKey={[field.fieldKey, 'time']}
                      className="w-full"
                      rules={[
                        {
                          required: true,
                          message: 'Mohon masukkan waktu!'
                        }
                      ]}
                    >
                      <RangePicker
                        placeholder={['Waktu Mulai', 'Waktu Selesai']}
                        format="HH:mm"
                        className='w-full'
                      />
                    </Item>
                  </div>

                  {/* Button */}
                  <div className="flex w-2/12">
                    <Button
                      type='primary'
                      danger
                      onClick={() => remove(field.name)}
                      className="w-full"
                      >
                      <div className="flex flex-row items-center justify-center space-x-2">
                        <RiIndeterminateCircleLine className="w-6 h-6 fill-white" />
                        <span>Hapus Jadwal</span>
                      </div>
                    </Button>
                  </div>

                </div>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
              >
                <div className='flex flex-row w-full space-x-2 items-center justify-center'>
                  <RiAddCircleLine className='w-6 h-6 fill-black' />
                  <span>Tambah Jadwal</span>
                </div>
              </Button>
            </Form.Item>
          </>
        )}
      </List>

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
