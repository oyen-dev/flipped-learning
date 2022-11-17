import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'
import { Attachment } from '../../components/others'

import Cookies from 'js-cookie'
import { Link, useLocation } from 'react-router-dom'
import { BsPencilSquare, BsTrash, BsFileText } from 'react-icons/bs'

const Post = (props) => {
  const { description, isTask, attachments, _id: postId, setFetchPosts } = props

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // use Location
  const { pathname } = useLocation()
  const classId = `cls-${pathname.split('/cls-')[1]}`

  // Delete Post
  const deletePost = async () => {
    // Config
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    // Show loading
    mySwal.fire({
      title: 'Deleting post...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Delete post
    try {
      await api.delete(`/class/${classId}/posts/${postId}`, config)
      // console.log(res)

      // Show success
      mySwal.fire({
        title: 'Success delete post!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => setFetchPosts(true))
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => setFetchPosts(true))
    }
  }

  // Handle delete dialog
  const deletePostDialog = () => {
    mySwal.fire({
      title: 'Apakah anda ingin menghapus post ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost()
      }
    })
  }

  return (
    <div className="flex flex-col space-y-5 w-full bg-transparent">
      <p className="mb-0">{description}</p>

      <div className="flex flex-col w-full space-y-2">
        {attachments.map((attachment) => <Attachment {...attachment} key={attachment._id} />)}
      </div>

      {/* Button for Teacher */}
      {user.role === 'TEACHER' && (
        <div className="flex flex-row space-x-4 w-full items-center justify-end">
          <Link to={`posts/${postId}/edit`} className='flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out'>
            <BsPencilSquare className="w-5 h-5 fill-white" />
            <span>Edit Postingan</span>
          </Link>

          <button
            onClick={deletePostDialog}
            className='flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg duration-300 ease-in-out'>
            <BsTrash className="w-5 h-5 fill-white" />
            <span>Hapus Postingan</span>
          </button>
        </div>
      )}

      {/* Button for Student */}
      {user.role === 'STUDENT' && isTask && (
        <div className="flex flex-row space-x-4 w-full items-center justify-end">
          <Link to={`tasks/${postId}/submissions`} className='flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out'>
            <BsFileText className="w-5 h-5 fill-white" />
            <span>Kumpulkan Tugas</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Post
