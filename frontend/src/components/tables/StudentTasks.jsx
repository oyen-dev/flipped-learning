import { useState, useEffect } from 'react'
import Smile1 from '../../assets/images/1.png'
import Smile2 from '../../assets/images/2.png'
import Smile3 from '../../assets/images/3.png'
import Smile4 from '../../assets/images/4.png'
import Smile5 from '../../assets/images/5.png'

import api from '../../api'

import momentId from '../../constants/momentId'

import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router-dom'
import { Spin, Tag } from 'antd'
import { BsPencilSquare } from 'react-icons/bs'
import moment from 'moment/moment'

moment.updateLocale('id', momentId)

const StudentTasks = (props) => {
  // Props destructure
  const { _id: postId, taskId } = props
  const { end } = taskId.deadline

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

  // Define point color
  const pointColor = (point) => {
    let color = '#f50'

    if (point >= 85) color = '#87d068'
    else if (point >= 75 && point < 85) color = '#108ee9'
    else if (point >= 65 && point < 75) color = '#faad14'
    else if (point >= 55 && point < 65) color = '#fa541c'

    return (
      <Tag color={color} className="text-white">
        {point}
      </Tag>
    )
  }

  // Define reaction
  const reaction = (reaction) => {
    let emoji = null

    if (reaction === 1) emoji = <img src={Smile1} alt="emoji" className="w-8 h-8" />
    else if (reaction === 2) emoji = <img src={Smile2} alt="emoji" className="w-8 h-8" />
    else if (reaction === 3) emoji = <img src={Smile3} alt="emoji" className="w-8 h-8" />
    else if (reaction === 4) emoji = <img src={Smile4} alt="emoji" className="w-8 h-8" />
    else emoji = <img src={Smile5} alt="emoji" className="w-8 h-8" />

    return emoji
  }

  // Define submission status
  const submissionStatus = (updatedAt) => {
    let color = '#faad14'
    let status = 'Telat Mengumpulkan'

    if (moment(end) > moment(updatedAt)) {
      color = '#87d068'
      status = 'Tepat Waktu'
    }
    return (
      <Tag color={color} className="text-white">
        {status}
      </Tag>
    )
  }

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
      const { data } = await api.get(
        `/class/${classId}/posts/${postId}/submissions`,
        config
      )

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
        <div className="flex flex-col w-full space-y-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`py-3 w-[${column.width}%] ${column.align} whitespace-nowrap`}
                  >
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
                  <tr
                    key={index}
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                  >
                    {/* Nomor */}
                    <td className="py-3 text-left">
                      <div className="flex items-center pl-3 justify-start">
                        <span className="font-medium whitespace-nowrap px-2">{index + 1}</span>
                      </div>
                    </td>

                    {/* Nama */}
                    <td className="py-3  text-left">
                      <div className="flex items-center justify-start">
                        <span className="font-medium whitespace-nowrap px-2">{fullName}</span>
                      </div>
                    </td>

                    {/* Tanggal */}
                    <td className="py-3  text-left">
                      <div className="flex items-center justify-start">
                        <span className="font-medium whitespace-nowrap px-2">
                          {submission === null
                            ? <Tag color="#f50" className="text-white">Belum Mengumpulkan</Tag>
                            : <Tag color="#87d068" className="text-white">
                              {moment(submission.updatedAt).format('LLLL')}
                            </Tag>
                          }
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3  text-left">
                      <div className="flex items-center justify-center">
                        <span className="font-medium whitespace-nowrap px-2">
                          {submission === null
                            ? <Tag color="#f50">Belum Mengumpulkan</Tag>
                            : submissionStatus(submission.updatedAt)
                          }
                        </span>
                      </div>
                    </td>

                    {/* Reaksi */}
                    <td className="py-3  text-left">
                      <div className="flex items-center justify-center">
                        <span className="font-medium whitespace-nowrap px-2">
                          {submission === null
                            ? <Tag color="#f50">Belum Mengumpulkan</Tag>
                            : reaction(submission.reaction)
                          }
                        </span>
                      </div>
                    </td>

                    {/* Nilai */}
                    <td className="py-3  text-left">
                      <div className="flex items-center justify-center">
                        <span className="font-medium whitespace-nowrap px-2">
                          {submission === null
                            ? <Tag color="#f50">Belum Mengumpulkan</Tag>
                            : submission.points === null
                              ? <Tag color="#faad14">Belum Dinilai</Tag>
                              : pointColor(submission.points)
                          }
                        </span>
                      </div>
                    </td>

                    {/* AKSI */}
                    <td className="py-3  text-left">
                      <div className="flex items-center justify-center">
                        <button
                          disabled={submission === null}
                          onClick={() =>
                            handleJudging(
                              `posts/${postId}/grading?submissionId=${submission._id}`
                            )
                          }
                          className={`flex flex-row items-center justify-center space-x-2 ${
                            submission === null
                              ? 'bg-gray-500'
                              : 'bg-blue-500 hover:bg-blue-800'
                          } py-2 px-4 rounded-md duration-300 ease-in-out`}
                        >
                          <BsPencilSquare className="w-5 h-5 fill-white" />
                          <span className="font-medium text-white">Nilai</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
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
