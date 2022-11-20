import { useState, useEffect } from 'react'

import api from '../../api'
import { Attachment } from '../others'
import { NoSubmission } from '../../pages/error'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { BsPencilSquare, BsFileText } from 'react-icons/bs'

const Submission = (props) => {
  // Props destructure
  const { _id: postId } = props

  // Use params
  const { id: classId } = useParams()

  // Local States
  const [submission, setSubmission] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(null)

  // Get submission detail
  const getSubmissionDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/posts/${postId}/submission`, config)
      // console.log(data)

      if (data.data) {
        setIsSubmitted(true)
        setSubmission(data.data)
      } else setIsSubmitted(false)
    } catch (error) {
      console.log(error)
    }
  }

  // Initialy get submission detail
  useEffect(() => {
    getSubmissionDetail()
  }, [])

  return (
    <div className="flex flex-col space-y-5 w-full bg-transparent">
      {isSubmitted !== null
        ? isSubmitted
          ? (
            <div className='flex flex-col space-y-2 w-full'>
              <p>{submission.answers}</p>
              <div className="flex flex-col w-full space-y-2">
                {submission.attachments.map((attachment) => <Attachment {...attachment} key={attachment._id} />)}
              </div>

              <div className="flex justify-end items-end">
                <Link to={`tasks/${postId}/submissions/edit`} className='flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out'>
                  <BsPencilSquare className="w-5 h-5 fill-white" />
                  <span>Edit pengumpulan tugas</span>
                </Link>
              </div>
            </div>
            )
          : <div className="flex flex-col space-y-2 ">
              <NoSubmission message="Belum ada tugas yang dikumpulkan" />

              <div className="flex justify-end items-end">
                <Link to={`tasks/${postId}/submissions`} className='flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out'>
                  <BsFileText className="w-5 h-5 fill-white" />
                  <span>Kumpulkan Tugas</span>
                </Link>
              </div>
          </div>
        : <Spin />
      }
    </div>
  )
}

export default Submission
