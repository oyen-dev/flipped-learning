import { useState } from 'react'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'

import Cookies from 'js-cookie'
import moment from 'moment/moment'
import {
  Form,
  Input,
  Collapse,
  Upload,
  message,
  Checkbox,
  DatePicker
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, Link } from 'react-router-dom'

const { Dragger } = Upload
const { Panel } = Collapse

const EditTaskInfo = (props) => {
  // Destrcuture props
  const { post } = props
  // console.log(post)

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [task, setTask] = useState(post.isTask)
  const [uploadedAttachments, setUploadedAttachments] = useState(
    post.attachments.map((attachment, index) => {
      return {
        uid: index + 1,
        name: attachment.name,
        status: 'done',
        url: attachment.url
      }
    })
  )
  const [waitUpload, setWaitUpload] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [fileList, setFileList] = useState([...uploadedAttachments])
  let tempAttachments = post.attachments.map((attachment) => {
    return {
      url: attachment.url,
      id: attachment._id
    }
  })
  tempAttachments = [...tempAttachments]
  const [attachments, setAttachments] = useState(tempAttachments)

  // Use location
  const { pathname } = useLocation()
  const endpoint = `cls-${pathname.split('/cls-')[1].split('/edit')[0]}`

  // Use Navigate
  const navigate = useNavigate()

  // UseForm
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    const payload = {
      title: values.title,
      description: values.description,
      attachments: attachments.map((attachment) => attachment.id),
      isTask: task,
      deadline: {
        start: post.isTask ? moment(post.taskId.deadline.start).format() : moment().format(),
        end: moment(values.deadline).format()
      }
    }

    // Show loading
    mySwal.fire({
      title: 'Updating post...',
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

    // Update post
    try {
      await api.put(`/class/${endpoint}`, payload, config)

      mySwal.fire({
        icon: 'success',
        title: 'Update post success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => navigate(-1))

      // Reset form
      form.resetFields()
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Oops something went wrong',
        text: error.response.data.message,
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('days')
  }

  // Custom upload image request
  const uploadAttachment = async options => {
    const { onSuccess, onError, file } = options

    // Set waitUpload to true
    setWaitUpload(true)

    const fmData = new FormData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    fmData.append('files', file)
    try {
      const { data } = await api.post('/attachment/multiple', fmData, config)
      const attach = data.data.attachments[0]

      // Insert attachment to tempAttachments
      const willBePushAttachment = {
        url: attach.url,
        id: attach._id
      }

      tempAttachments = [...attachments, willBePushAttachment]
      setAttachments([...tempAttachments])

      // Insert attachment to uploadedAttachments
      const uploadedAttachment = {
        uid: uploadedAttachments.length + 1,
        name: attach.name,
        status: 'done',
        url: attach._id
      }
      setUploadedAttachments([...uploadedAttachments, uploadedAttachment])

      onSuccess('Ok')
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    } finally {
      setWaitUpload(false)
    }
  }

  const uploadAttachmentProps = {
    name: 'attachmentForm',
    multiple: true,
    customRequest: uploadAttachment,
    beforeUpload: (file) => {
      const listOfAcceptFiles = [
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'video/mp4',
        'video/quicktime',
        'video/webm',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ]

      const acceptFiles = listOfAcceptFiles.includes(file.type)

      if (!acceptFiles) {
        message.error('You can only upload image, video, pdf, ms word, and ppt file!')
      }

      const limitFileSize = file.size / 1024 / 1024 < 25
      if (!limitFileSize) {
        message.error('Image must smaller than 25MB!')
      }
      return acceptFiles && limitFileSize
    },
    defaultFileList: uploadedAttachments,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList)
    },
    onRemove: (file) => {
      const deletedFileName = file.name.replace(/\s/g, '')
      console.log(deletedFileName)

      // Remove attachment from tempAttachments using include of property url
      tempAttachments = attachments.filter(attachment => !attachment.url.includes(deletedFileName))
      // console.log(tempAttachments)
      setAttachments(tempAttachments)
    }
  }
  return (
    <div className="w-full flex flex-col bg-[#e9ecef] text-black dark:bg-gray-700 dark:text-white justify-start py-2 px-4 rounded-lg space-y-2">
      <p className="mb-0 text-center md:text-left">
        Perbarui informasi kelas atau penugasan:
      </p>
      <Form
        name="editTaskInfoForm"
        form={form}
        initialValues={{
          title: post.title ? post.title : '',
          description: post.description ? post.description : '',
          deadline: post.isTask ? moment(post.taskId.deadline.end) : ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-4"
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan judul informasi atau penugasan!'
            }
          ]}
        >
          <Input placeholder="Judul Informasi atau Penugasan" />
        </Form.Item>

        <Form.Item name="description">
          <Input.TextArea
            placeholder="Deskripsi Informasi atau Penugasan"
            autoSize={{ minRows: 5, maxRows: 8 }}
          />
        </Form.Item>

        <Collapse>
          <Panel header="Lampiran" key="1">
            <Form.Item name="lampiran">
              <Dragger {...uploadAttachmentProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            </Form.Item>
          </Panel>
        </Collapse>

        {/* Set Deadline */}
        {task && (
          <Form.Item
            name="deadline"
            rules={[
              {
                required: true,
                message: 'Mohon atur tengat penugasan!'
              }
            ]}
            className="w-full"
          >
            <DatePicker placeholder='Tengat penugasan' disabledDate={disabledDate} showTime className='w-full' />
          </Form.Item>
        )}

        <div className="w-full flex flex-row justify-between">
            <Checkbox
              checked={task}
              value={task}
              onChange={() => {
                setTask(!task)
              }}
            >
              <p className="mb-0 text-black dark:text-white whitespace-nowrap">
                Jadikan tugas?
              </p>
            </Checkbox>

          <Form.Item className="flex w-full items-center justify-end">
            <div className="flex flex-row w-full space-x-4">
              <Link
                to={-1}
                disabled={waitUpload}
                className={`flex py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white ${waitUpload ? 'bg-gray-400 dark:bg-gray-400 cursor-wait' : 'bg-gray-600 hover:bg-gray-800'} rounded-lg duration-300 ease-in-out`}>
                Batal
              </Link>

              <button
                disabled={waitUpload}
                className={`flex py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-black dark:text-white ${waitUpload ? 'bg-gray-400 dark:bg-gray-400 cursor-wait' : 'bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4]'} rounded-lg duration-300 ease-in-out`}>
                Perbarui
              </button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default EditTaskInfo
