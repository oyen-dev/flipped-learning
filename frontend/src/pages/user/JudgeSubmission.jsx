import { useState, useEffect } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { JudgeStudentSubmission } from '../../views/class'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

const JudgeSubmissionPage = () => {
  // useParams
  const { id: classId, postId } = useParams()

  // useLocation
  const { pathname } = useLocation()

  // Navigator
  const navigate = useNavigate()

  // Local States
  const [post, setPost] = useState(null)
  const [submissions, setSubmissions] = useState(null)
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
      name: 'Penilaian Tugas',
      destination: `${pathname}`
    }
  ])

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
      //   console.log(data)

      const { post } = data.data
      setPost(post)
    } catch (error) {
      console.log(error)
    }
  }

  // Get student task submissions
  const getStudentTaskSubmissions = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(
        `/class/${classId}/posts/${postId}/submissions`,
        config
      )

      setSubmissions(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initally get task detail
  useEffect(() => {
    getTaskDetail()
    getStudentTaskSubmissions()
  }, [])

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
        <div className="flex flex-col w-full rounded-lg bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
          <div className="flex flex-col space-y-6 px-4 py-4">
            {post && submissions
              ? <JudgeStudentSubmission post={post} submissions={submissions} />
              : <Spin size="small" />
            }
          </div>
        </div>
    </Layout>
  )
}

export default JudgeSubmissionPage
