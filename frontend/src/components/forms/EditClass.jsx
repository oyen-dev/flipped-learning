import { useState, useMemo, useRef, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useManagement } from '../../contexts/Management'

import FallBack from '../../assets/images/profile.png'

import api from '../../api'

import { debounce } from 'lodash'
import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  TimePicker,
  Image,
  message,
  Upload
} from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined } from '@ant-design/icons'
import { RiIndeterminateCircleLine, RiAddCircleLine } from 'react-icons/ri'
import Cookies from 'js-cookie'
import moment from 'moment'

const { RangePicker } = TimePicker
const { Item, List } = Form

const EditClass = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Management States
  const { managementStates } = useManagement()
  const {
    willUpdateClassId,
    isModalVisible,
    setIsModalVisible,
    setIsFetchClass
  } = managementStates

  // Local States
  const [teacherList, setTeacherList] = useState([])
  const [classDetail, setClassDetail] = useState(null)
  const [localFetch, setLocalFetch] = useState(false)
  const [scheduleList, setScheduleList] = useState([])
  const [fileList, setFileList] = useState([])
  const [days] = useState([
    { value: 1, label: 'Senin' },
    { value: 2, label: 'Selasa' },
    { value: 3, label: 'Rabu' },
    { value: 4, label: 'Kamis' },
    { value: 5, label: 'Jumat' },
    { value: 6, label: 'Sabtu' }
  ])

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

  // Close modal-update-class
  const closeModal = () => {
    // The modal is come from daisyUI, so we need to use this way to close it
    document.getElementById('modal-update-class').checked = false

    // Update class list
    setIsFetchClass(true)
  }

  const onFinish = async (values) => {
    // console.log('Success:', values)
    const payload = {
      name: values.name,
      grade: values.grade,
      teachers: values.teachers.map((teacher) => teacher.value),
      schedule: !values.schedule ? [] : mapSchedule(values.schedule)
    }

    // Show loading
    mySwal.fire({
      title: 'Memperbarui Kelas...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      await api.put(`/class/${willUpdateClassId}`, payload, config)

      // Show success message
      mySwal
        .fire({
          icon: 'success',
          title: 'Kelas berhasil diperbarui!',
          showConfirmButton: false,
          backdrop: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          timer: 2000,
          timerProgressBar: true
        })
        .then(() => closeModal())
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: error.response.data.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        timerProgressBar: true,
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

  // Get class detail
  const getClassDetail = async () => {
    // Reset class detail
    setClassDetail(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${willUpdateClassId}`, config)
      // console.log(data)

      // Destructure data
      const { data: classData } = data
      const { schedule } = classData

      // Set class detail
      setClassDetail(classData)
      setScheduleList(
        schedule.map((schedule) => {
          return {
            day: new Date(schedule.start).getDay(),
            time: [moment(schedule.start), moment(schedule.end)]
          }
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  // Custom upload image request
  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options

    const fmData = new FormData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    fmData.append('files', file)
    try {
      await api.post(`class/${willUpdateClassId}/cover`, fmData, config)
      onSuccess('Ok')
      setLocalFetch(true)
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    }
  }

  // Upload Configuration
  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      setFileList(file)
      return isJpgOrPng && isLt2M
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList)
    },
    onPreview: async (file) => {
      let src = file.url
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(file.originFileObj)
          reader.onload = () => resolve(reader.result)
        })
      }
      const image = new Image()
      image.src = src
      const imgWindow = window.open(src)
      imgWindow.document.write(image.outerHTML)
    },
    customRequest: uploadImage
  }

  // Monitor willUpdateClassId
  useEffect(() => {
    if (isModalVisible) {
      getClassDetail()
      setIsModalVisible(false)
    }
  }, [willUpdateClassId])

  // Monitor cover change
  useEffect(() => {
    if (localFetch) {
      getClassDetail()
      setLocalFetch(false)
    }
  }, [localFetch])

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {classDetail === null
        ? (
        <Spin size="small" />
          )
        : (
        <>
          <div className="flex flex-col space-y-4 items-center justify-center">
            <Image
              src={classDetail.cover}
              className="w-40 h-40"
              fallback={FallBack}
            />
            <ImgCrop rotate>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Perbarui Cover Kelas</Button>
              </Upload>
            </ImgCrop>
          </div>

          <Form
            name="editClassForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-full"
            initialValues={{
              name: classDetail.name,
              grade: classDetail.gradeId.name,
              teachers: classDetail.teachers.map((teacher) => ({
                label: teacher.fullName,
                value: teacher._id
              }))
            }}
          >
            <p className="text-black dark:text-white duration-300 ease-in-out text-base font-normal mb-0">
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

            <p className="text-black dark:text-white duration-300 ease-in-out text-base font-normal mb-0">
              Kelas/Jenjang
            </p>
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

            <p className="text-black dark:text-white duration-300 ease-in-out text-base font-normal mb-0">
              Guru/Pengajar
            </p>
            <Item
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
            </Item>

            <p className="text-black dark:text-white duration-300 ease-in-out text-base font-normal mb-0">
              Jadwal Kelas
            </p>
            <List name="schedule" initialValue={scheduleList}>
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
                            <Select options={days} placeholder="Pilih Hari" />
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
                              className="w-full"
                            />
                          </Item>
                        </div>

                        {/* Button */}
                        <div className="flex w-2/12">
                          <Button
                            type="primary"
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
                    <Button type="dashed" onClick={() => add()} block>
                      <div className="flex flex-row w-full space-x-2 items-center justify-center">
                        <RiAddCircleLine className="w-6 h-6 fill-black" />
                        <span>Tambah Jadwal</span>
                      </div>
                    </Button>
                  </Form.Item>
                </>
              )}
            </List>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                <p className="text-white font-medium">Perbarui Data Kelas</p>
              </Button>
            </Form.Item>
          </Form>
        </>
          )}
    </div>
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

export default EditClass
