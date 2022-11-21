import { useState, useEffect } from 'react'

import Smile1 from '../../assets/images/1.png'
import Smile2 from '../../assets/images/2.png'
import Smile3 from '../../assets/images/3.png'
import Smile4 from '../../assets/images/4.png'
import Smile5 from '../../assets/images/5.png'

import api from '../../api'
import { Attachment } from '../others'
import { NoSubmission } from '../../pages/error'

import Cookies from 'js-cookie'
import { Spin, Divider } from 'antd'
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
      console.log(data.data)

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
              {/* Answers */}
              <p>{submission.answers}</p>

              {/* Attachment */}
              <div className="flex flex-col w-full space-y-2">
                {submission.attachments.map((attachment) => <Attachment {...attachment} key={attachment._id} />)}
              </div>

              <div className="flex flex-row space-x-2 pt-2 items-center">
                <p className='mb-0 font-bold'>Reaksimu: </p>
                {submission.reaction === 0
                  ? <img src={Smile1} alt="emoji" className="w-8 h-8" />
                  : submission.reaction === 1
                    ? <img src={Smile2} alt="emoji" className="w-8 h-8" />
                    : submission.reaction === 2
                      ? <img src={Smile3} alt="emoji" className="w-8 h-8" />
                      : submission.reaction === 3
                        ? <img src={Smile4} alt="emoji" className="w-8 h-8" />
                        : <img src={Smile5} alt="emoji" className="w-8 h-8" />
                }
              </div>

              {/* Divider */}
              <Divider />

              <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-2 items-center">
                  <p className='mb-0 font-bold'>Nilai:</p>
                  <p className='mb-0 text-lg'>{submission.points}</p>
                </div>

                <div className="flex flex-row space-x-2 items-center">
                  <p className='mb-0 font-bold'>Umpan Balik:</p>
                  <div className='mb-0'>
                    {submission.feedback === null
                      ? <span className='text-gray-300'>Tidak ada umpan balik</span>
                      : <span>{submission.feedback}</span>
                    }
                  </div>
                </div>
              </div>

              {/* Button */}
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
