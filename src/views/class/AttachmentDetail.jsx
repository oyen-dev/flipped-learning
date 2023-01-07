import { useState, useEffect } from 'react'

import api from '../../api'
import {
  ViewDocument,
  ViewImage,
  ViewPDF,
  ViewVideo,
  ViewOther
} from '../../components/viewer'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

const AttachmentDetail = (props) => {
  // Props destructure
  const { attachmentId } = props

  // Navigator
  const navigate = useNavigate()

  // Local states
  const [attachment, setAttachmente] = useState(null)
  const [type, setType] = useState(1)
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

  // Get attachment detail
  const getAttachmentDetail = async () => {
    // Reset attachment
    setAttachmente(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/attachment/${attachmentId}`, config)
      // console.log(data)

      const { attachment } = data.data
      setAttachmente(attachment)
      setType(listOfAcceptFiles.indexOf(attachment.type))
    } catch (error) {
      console.log(error)
      navigate('/404')
    }
  }

  // Initial get attachment
  useEffect(() => {
    getAttachmentDetail()
  }, [attachmentId])
  return (
    <div className="flex flex-col w-full rounded-lg py-2 px-2 bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
      {attachment
        ? (
        <>
          {type <= 2 && <ViewImage {...attachment} />}
          {type > 2 && type <= 5 && <ViewVideo {...attachment} />}
          {type > 5 && type <= 6 && <ViewPDF {...attachment} />}
          {type > 6 && type <= 8 && <ViewDocument {...attachment} />}
          {type > 8 && type <= 10 && <ViewDocument {...attachment} />}
          {type > 10 && <ViewOther {...attachment} />}
        </>
          )
        : (
        <Spin size="small" className="mx-auto" />
          )}
    </div>
  )
}

export default AttachmentDetail
