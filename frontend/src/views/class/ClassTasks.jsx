import { useState, useEffect } from 'react'

import api from '../../api'
import { PostList } from './index'

import { Spin } from 'antd'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const ClassTasks = () => {
  // useParams
  const { id } = useParams()

  // Local states
  const [tasks, setTasks] = useState(null)
  const [fetchTasks, setFetchTasks] = useState(true)

  // Get class tasks
  const getClassTasks = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/class/${id}/tasks`, config)
      // console.log(data)

      const { posts } = data.data
      setTasks(posts)
    } catch (error) {
      console.log(error)
    }
  }

  // Initialy get class tasks
  useEffect(() => {
    if (fetchTasks) {
      getClassTasks()
      setFetchTasks(false)
    }
  }, [fetchTasks])
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 space-y-4 rounded-lg text-black dark:text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
      {tasks
        ? tasks.length > 0
          ? <PostList posts={tasks} setFetchPosts={setFetchTasks} isTask={true} />
          : 'Tidak ada'
        : <Spin />
      }
    </div>
  )
}

export default ClassTasks
