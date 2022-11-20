import { useState, useEffect } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { TaskHeader } from '../../components/card'
import { EditSubmitTask } from '../../components/forms'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const EditSubmittedTaskPage = () => {
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
  const [submittedTask, setSubmittedTask] = useState(null)

  // Get task detail
  const getTaskDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/posts/${postId}`, config)
      // console.log(data)

      const { post } = data.data
      setPost(post)
    } catch (error) {
      console.log(error)
    }
  }

  // Get submitted task
  const getSubmitted = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/posts/${postId}/submission`, config)
      // console.log(data)

      setSubmittedTask(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get task detail and submitted task
  useEffect(() => {
    getTaskDetail()
    getSubmitted()
  }, [])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full rounded-lg py-2 px-2 bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        {post
          ? (
          <div className="flex flex-col space-y-6">
            <TaskHeader post={post} />

            {submittedTask !== null
              ? <EditSubmitTask submittedTask={submittedTask} />
              : <Spin />
            }
          </div>
            )
          : (
          <Spin size="small" />
            )}
      </div>
    </Layout>
  )
}

export default EditSubmittedTaskPage
