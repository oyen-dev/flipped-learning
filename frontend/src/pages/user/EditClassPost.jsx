import { useState, useEffect } from 'react'
// import { useGlobal } from '../../contexts/Global'
// import { useAuth } from '../../contexts/Auth'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { EditTaskInfo } from '../../components/forms'

import { Spin } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const EditClassPost = () => {
  // Use params
  const { id: classId, postId } = useParams()

  // Navigator
  const navigate = useNavigate()

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
      name: 'Beranda Kelas',
      destination: `/classes/${classId}`
    },
    {
      name: 'Edit Postingan',
      destination: `/classes/${classId}/posts/${postId}/edit`
    }
  ]

  // Local states
  const [post, setPost] = useState({
    title: null,
    description: null,
    isTask: null,
    taskId: {
      deadline: {
        start: null,
        end: null
      }
    }
  })

  // Get specific post
  const getPost = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/posts/${postId}`, config)
      // console.log(data)
      setPost(data.data.post)
    } catch (error) {
      console.log(error)
      if (error.response.status === 404) {
        navigate('/404')
      }
    }
  }

  // Initial get post
  useEffect(() => {
    getPost()
  }, [])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex w-full items-center justify-center">
        {post.title === null ? <Spin /> : <EditTaskInfo post={post} />}
      </div>
    </Layout>
  )
}

export default EditClassPost
