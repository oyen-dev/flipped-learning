import { useState } from 'react'
import { useGlobal } from '../../contexts/Global'

import Emoji1 from '../../assets/gif/1.gif'
import Emoji2 from '../../assets/gif/2.gif'
import Emoji3 from '../../assets/gif/3.gif'
import Emoji4 from '../../assets/gif/4.gif'
import Emoji5 from '../../assets/gif/5.gif'

import api from '../../api'

import Cookies from 'js-cookie'
import { Form, Input, Upload, message, Collapse } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'

// Style
import './radioStyle.css'

const { Dragger } = Upload
const { TextArea } = Input
const { Panel } = Collapse

const SubmitTask = (props) => {
  // useParams
  const { id: classId, postId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [reaction, setReaction] = useState(null)
  const [waitUpload, setWaitUpload] = useState(false)
  const [reactions] = useState([
    {
      value: 1,
      image: Emoji1
    },
    {
      value: 2,
      image: Emoji2
    },
    {
      value: 3,
      image: Emoji3
    },
    {
      value: 4,
      image: Emoji4
    },
    {
      value: 5,
      image: Emoji5
    }
  ])
  const [isSelectted, setIsSelected] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [fileList, setFileList] = useState([])
  const [attachments, setAttachments] = useState([])
  let tempAttachments = []

  // UseForm
  const [form] = Form.useForm()

  // Submit Form
  const onFinish = async (values) => {
    const payload = {
      answers: values.answers === '' ? null : values.answers,
      attachments:
        attachments.length === 0
          ? []
          : attachments.map((attachment) => attachment.id),
      reaction
    }

    console.log(payload)

    // Check if reaction is selected
    if (payload.answers === undefined || payload.answers === null) {
      if (payload.attachments.length === 0) message.error('Isi jawaban atau lampirkan file terlebih dahulu')
    } else if (reaction === null) message.error('Pilih reaksi terlebih dahulu')
    else {
      // Show loading
      mySwal.fire({
        title: 'Submitting...',
        allowEscapeKey: true,
        allowOutsideClick: true,
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
        await api.post(
          `/class/${classId}/posts/${postId}/submissions`,
          payload,
          config
        )

        // Show success
        mySwal
          .fire({
            icon: 'success',
            title: 'Submitted!',
            allowOutsideClick: true,
            backdrop: true,
            allowEscapeKey: true,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          })
          .then(() => {
            navigate(`/classes/${classId}`)
          })
      } catch (error) {
        console.log(error)
        mySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
          allowOutsideClick: true,
          backdrop: true,
          allowEscapeKey: true,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        })
      }
    }
  }

  // Error Submit Form
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // Handler reaction
  const handleReaction = (e) => {
    setReaction(e)

    if (!isSelectted) setIsSelected(true)
  }

  // Custom upload image request
  const uploadAttachment = async (options) => {
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
      // console.log(data)

      const attachment = {
        url: data.data.attachments[0].url,
        id: data.data.attachments[0]._id
      }
      tempAttachments.push(attachment)
      setAttachments(tempAttachments)

      onSuccess('Ok')
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    } finally {
      setWaitUpload(false)
    }
  }

  // Upload attachment
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
        message.error(
          'You can only upload image, video, pdf, ms word, and ppt file!'
        )
      }

      const limitFileSize = file.size / 1024 / 1024 < 25
      if (!limitFileSize) {
        message.error('Image must smaller than 25MB!')
      }
      return acceptFiles && limitFileSize
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList)
    },
    onRemove: (file) => {
      console.log(file)

      const deletedFileName = file.name.replace(/\s/g, '')
      console.log(deletedFileName)

      // Remove attachment from tempAttachments using include of property url
      tempAttachments = attachments.filter(
        (attachment) => !attachment.url.includes(deletedFileName)
      )
      // console.log(tempAttachments)
      setAttachments(tempAttachments)
    }
  }
  return (
    <div className="w-full flex flex-col bg-[#e9ecef] text-black dark:bg-gray-700 dark:text-white justify-start py-2 px-4 rounded-lg space-y-2">
      <p className="mb-0 text-center md:text-left">
        Tulis jawaban disini atau lampirkan file jawaban
      </p>
      <Form
        name="postTaskInfoForm"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-4 w-full"
      >
        <Form.Item
          name="answers"
          rules={[
            {
              required: false,
              message: 'Mohon masukkan judul informasi atau penugasan!'
            }
          ]}
        >
          <TextArea
            placeholder="Jawaban"
            autoSize={{ minRows: 4, maxRows: 10 }}
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
                  Klik atau tarik file untuk mengunggah
                </p>
                <p className="ant-upload-hint">
                  Jenis file yang diperbolehkan berupa gambar, video, pdf, ms
                  word, dan ppt
                  <br />
                  Ukuran file maksimal 25MB
                </p>
              </Dragger>
            </Form.Item>
          </Panel>
        </Collapse>

        <div className={`flex flex-col space-y-2 items-center bg-white w-full ${isSelectted ? 'h-32' : 'h-24'} rounded-sm duration-300 ease-in-out`}>
          <p className='mb-0 py-2 text-center font-medium tracking-wide'>Reaksi kamu:</p>
          <div className="flex flex-row space-x-2">
            {/* Emoji 1 */}
            <div>
              <input
                type="radio"
                name="emotion"
                id="sad"
                className="input-hidden"
              />
              <label htmlFor="sad">
                <img
                  src={reactions[0].image}
                  onClick={() => handleReaction(1)}
                  className={`cursor-pointer ${
                    reaction === 1 ? 'w-20 h-20 ' : 'w-10 h-10'
                  }`}
                />
              </label>
            </div>

            {/* Emoji 2 */}
            <div>
              <input
                type="radio"
                name="emotion"
                id="sad"
                className="input-hidden"
              />
              <label htmlFor="sad">
                <img
                  src={reactions[1].image}
                  onClick={() => handleReaction(2)}
                  className={`cursor-pointer ${
                    reaction === 2 ? 'w-20 h-20 ' : 'w-10 h-10'
                  }`}
                />
              </label>
            </div>

            {/* Emoji 3 */}
            <div>
              <input
                type="radio"
                name="emotion"
                id="sad"
                className="input-hidden"
              />
              <label htmlFor="sad">
                <img
                  src={reactions[2].image}
                  onClick={() => handleReaction(3)}
                  className={`cursor-pointer ${
                    reaction === 3 ? 'w-20 h-20 ' : 'w-10 h-10'
                  }`}
                />
              </label>
            </div>

            {/* Emoji 4 */}
            <div>
              <input
                type="radio"
                name="emotion"
                id="sad"
                className="input-hidden"
              />
              <label htmlFor="sad">
                <img
                  src={reactions[3].image}
                  onClick={() => handleReaction(4)}
                  className={`cursor-pointer ${
                    reaction === 4 ? 'w-20 h-20 ' : 'w-10 h-10'
                  }`}
                />
              </label>
            </div>

            {/* Emoji 5 */}
            <div>
              <input
                type="radio"
                name="emotion"
                id="sad"
                className="input-hidden"
              />
              <label htmlFor="sad">
                <img
                  src={reactions[4].image}
                  onClick={() => handleReaction(5)}
                  className={`cursor-pointer ${
                    reaction === 5 ? 'w-20 h-20 ' : 'w-10 h-10'
                  }`}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between">
          <Form.Item className="w-full flex justify-end">
            <button
              disabled={waitUpload}
              className={`py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-black dark:text-white ${
                waitUpload
                  ? 'bg-gray-400 dark:bg-gray-400 cursor-wait'
                  : 'bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4]'
              } rounded-lg duration-300 ease-in-out`}
            >
              Posting
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default SubmitTask
