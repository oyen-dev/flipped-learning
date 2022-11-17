import { useEffect, useState } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { ViewPDF } from '../../components/viewer'

import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import Cookies from 'js-cookie'

const AttachmentDetail = () => {
  // Use params
  const { attachmentId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Location
  const { pathname } = useLocation()
  const classLocation = pathname.split('/attachments')[0]

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Daftar Kelas',
      destination: '/classes'
    },
    {
      name: 'Detail Kelas',
      destination: `${classLocation}`
    },
    {
      name: 'Detail Lampiran',
      destination: `${pathname}`
    }
  ]

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
  }, [])

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full rounded-lg py-2 px-2 bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        {attachment
          ? (
            <>
              {type <= 2 && 'Image'}
              {type > 2 && type <= 5 && 'Video'}
              {type > 5 && type <= 6 && <ViewPDF {...attachment}/>}
              {type > 6 && type <= 8 && 'Word'}
              {type > 8 && type <= 10 && 'PPT'}
              {type > 10 && 'Other'}
            </>
            )
          : <Spin size="small" className="mx-auto" />
        }
      </div>
    </Layout>
  )
}

export default AttachmentDetail
