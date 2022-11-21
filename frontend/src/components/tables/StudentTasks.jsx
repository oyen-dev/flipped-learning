import { useState, useEffect } from 'react'

import api from '../../api'

import momentId from '../../constants/momentId'

import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { BsPencilSquare } from 'react-icons/bs'
import moment from 'moment/moment'

moment.updateLocale('id', momentId)

const StudentTasks = (props) => {
  // Props destructure
  const { _id: postId } = props

  // useParams
  const { id: classId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Local States
  const [submissions, setSubmissions] = useState(null)
  const [fetchSubmission, setFetchSubmission] = useState(true)

  // Table columns
  const [columns] = useState([
    {
      title: 'NO',
      width: 5,
      align: 'pl-3 text-left'
    },
    {
      title: 'NAMA',
      width: 25,
      align: 'text-left'
    },
    {
      title: 'TANGGAL PENGUMPULAN',
      width: 10,
      align: 'text-left'
    },
    {
      title: 'STATUS PENGUMPULAN',
      width: 10,
      align: 'text-center'
    },
    {
      title: 'REAKSI',
      width: 5,
      align: 'text-center'
    },
    {
      title: 'NILAI',
      width: 10,
      align: 'text-center'
    },
    {
      title: 'AKSI',
      width: 35,
      align: 'text-center'
    }
  ])

  // Handle judging
  const handleJudging = (path) => {
    navigate(path)
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
      const { data } = await api.get(`/class/${classId}/posts/${postId}/submissions`, config)
      console.log(data)

      setSubmissions(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initally get student task submissions
  useEffect(() => {
    if (fetchSubmission) {
      setSubmissions(null)
      getStudentTaskSubmissions()
      setFetchSubmission(false)
    }
  }, [fetchSubmission])
  return (
    <>
      {submissions !== null
        ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
              {columns.map((column, index) => (
                <th key={index} className={`py-3 w-[${column.width}%] ${column.align} whitespace-nowrap`}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-black text-xs font-light">
            {submissions.map((subs, index) => {
              const { student, submission } = subs
              const { fullName } = student
              return (
                <tr key={index} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">

                  {/* Nomor */}
                  <td className="py-3 text-left whitespace-nowrap">
                    <div className="flex items-center pl-3 justify-start">
                      <span className="font-medium">{index + 1}</span>
                    </div>
                  </td>

                  {/* Nama */}
                  <td className="py-3  text-left">
                    <div className="flex items-center justify-start">
                      <span className="font-medium">{fullName}</span>
                    </div>
                  </td>

                  {/* Tanggal */}
                  <td className="py-3  text-left">
                    <div className="flex items-center justify-start">
                      <span className="font-medium">{submission === null ? 'Belum Mengumpulkan' : moment(submission.updatedAt).format('LLLL')}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3  text-left">
                    <div className="flex items-center justify-center">
                      <span className="font-medium">{submission === null ? 'Belum Mengumpulkan' : moment() > moment(submission.updatedAt) ? 'Tepat Waktu' : 'Telat'}</span>
                    </div>
                  </td>

                  {/* Reaksi */}
                  <td className="py-3  text-left">
                    <div className="flex items-center justify-center">
                      <span className="font-medium">{submission === null ? 'Belum Mengumpulkan' : submission.reaction}</span>
                    </div>
                  </td>

                  {/* Nilai */}
                  <td className="py-3  text-left">
                    <div className="flex items-center justify-center">
                      <span className="font-medium">{submission === null ? 'Belum Mengumpulkan' : submission.points === null ? 'Belum dinilai' : submission.points}</span>
                    </div>
                  </td>

                  {/* AKSI */}
                  <td className="py-3  text-left">
                    <div className="flex items-center justify-center">
                      <button
                        disabled={submission === null}
                        onClick={() => handleJudging(`posts/${postId}/submissions/${submission._id}`)}
                        className={`flex flex-row items-center justify-center space-x-2 ${submission === null ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-800'} py-2 px-4 rounded-md duration-300 ease-in-out`}
                      >
                        <BsPencilSquare className='w-5 h-5 fill-white' />
                        <span className='font-medium text-white'>Nilai</span>
                      </button>
                    </div>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
          )
        : (
        <div className="flex w-full items-center justify-center">
          <Spin size="small" />
        </div>
          )}
    </>
  )
}

export default StudentTasks
