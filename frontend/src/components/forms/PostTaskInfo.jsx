import { useState } from 'react'

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
const { Dragger } = Upload

const { Panel } = Collapse

const PostTaskInfo = () => {
  // Local States
  const [task, setTask] = useState(false)

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const changeDate = (value, dateString) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  const onOk = (value) => {
    console.log('onOk: ', value)
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('days')
  }

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange (info) {
      const { status } = info.file

      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },

    onDrop (e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }
  return (
    <div className="w-full flex flex-col bg-gray-700 justify-start py-2 px-4 rounded-lg space-y-2">
      <p className="mb-0 text-center md:text-left">
        Tulis informasi kelas atau penugasan:
      </p>
      <Form
        name="postTaskInfoForm"
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
              <Dragger {...props}>
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
            <DatePicker placeholder='Tengat penugasan' disabledDate={disabledDate} showTime onChange={changeDate} onOk={onOk} className='w-full' />
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
              <p className="mb-0 text-white whitespace-nowrap">
                Jadikan tugas?
              </p>
            </Checkbox>

          <Form.Item className="w-full flex justify-end">
            <button className="py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-[#34A0A4] rounded-lg">
              Posting
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default PostTaskInfo
