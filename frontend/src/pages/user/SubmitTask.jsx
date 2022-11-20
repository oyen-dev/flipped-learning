import { useState, useEffect } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { TaskHeader } from '../../components/card'
import { SubmitTask } from '../../components/forms'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const SubmitTaskPage = () => {
  // Navigator
  const navigate = useNavigate()

  // useParams
  const { id: classId, postId } = useParams()

  // useLocation
  const { pathname } = useLocation()

  // Local States
  const [paths] = useState([
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
      destination: `/classes/${classId}`
    },
    {
      name: 'Pengumpulan Tugas',
      destination: `${pathname}`
    }
  ])
  const [post, setPost] = useState(null)

  // Get task detail
  const getTaskDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(
        `/class/${classId}/posts/${postId}`,
        config
      )
      //   console.log(data)

      const { post } = data.data
      setPost(post)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get task detail
  useEffect(() => {
    getTaskDetail()
  }, [])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full rounded-lg py-2 px-2 bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        {post
          ? (
          <div className="flex flex-col space-y-6">
            <TaskHeader post={post} />
            <SubmitTask />
          </div>
            )
          : (
          <Spin size="small" />
            )}
      </div>
    </Layout>
  )
}

export default SubmitTaskPage
