import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import { PostTaskInfo } from '../../components/forms'
import { PostList } from './index'

import { Spin, Divider } from 'antd'
import api from '../../api'
import Cookies from 'js-cookie'

const InformationCenter = (props) => {
  // Props destructure
  const { id } = props

  // Global States
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Local States
  const [classData, setClassData] = useState(null)
  const [fetchPosts, setFetchPosts] = useState(true)

  const getClassPosts = async () => {
    // Show Loading
    mySwal.fire({
      html: 'Wait a moment...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    try {
      const { data } = await api.get(`/class/${id}/posts`, config)
      // console.log(data.data)
      setClassData(data.data)
    } catch (error) {
      console.log(error)
    } finally {
      mySwal.close()
    }
  }

  // Fetch data when fetchPosts state changed
  useEffect(() => {
    if (fetchPosts) {
      getClassPosts()
      setFetchPosts(false)
    }
  }, [fetchPosts])

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 space-y-4 rounded-lg text-black dark:text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
      {classData === null
        ? <Spin />
        : <>
            {/* Posting Informasi */}
            {user.role === 'TEACHER'
              ? <>
                  <PostTaskInfo setFetchPosts={setFetchPosts}/>
                  <Divider />
                </>
              : null}

            {/* Class Posts */}
            <PostList posts={classData.posts} setFetchPosts={setFetchPosts} />
          </>
          }
    </div>
  )
}

export default InformationCenter
