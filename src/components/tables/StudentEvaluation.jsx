import { useState } from 'react'

import momentId from '../../constants/momentId'

import { BsEye } from 'react-icons/bs'
import { Tag } from 'antd'
import moment from 'moment/moment'
import { useNavigate } from 'react-router-dom'

moment.updateLocale('id', momentId)

const StudentEvaluation = (props) => {
  // Props destructure
  const { students, evaluation } = props
  const { deadline } = evaluation

  // Navigator
  const navigate = useNavigate()

  // Table columns
  const [columns] = useState([
    {
      title: 'NO',
      width: 5,
      align: 'pl-3 text-left'
    },
    {
      title: 'NAMA',
      width: 35,
      align: 'text-left'
    },
    {
      title: 'TANGGAL PENGUMPULAN',
      width: 20,
      align: 'text-left'
    },
    {
      title: 'STATUS PENGUMPULAN',
      width: 20,
      align: 'text-center'
    },
    {
      title: 'NILAI',
      width: 10,
      align: 'text-center'
    },
    {
      title: 'AKSI',
      width: 10,
      align: 'text-center'
    }
  ])

  // Define submission status
  const submissionStatus = (createdAt) => {
    let color = '#faad14'
    let status = 'Telat Mengumpulkan'

    if (moment(deadline.end) > moment(createdAt)) {
      color = '#108ee9'
      status = 'Tepat Waktu'
    }
    return (
      <Tag color={color} className="text-white">
        {status}
      </Tag>
    )
  }

  return (
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
          {students.map((student, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
            >
              {/* Nomor */}
              <td className="py-3 text-left">
                <div className="flex items-center pl-3 justify-start">
                  <span className="font-medium whitespace-nowrap px-2">
                    {index + 1}
                  </span>
                </div>
              </td>

              {/* Nama */}
              <td className="py-3  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap px-2">
                    {student.fullName}
                  </span>
                </div>
              </td>

              {/* Tanggal */}
              <td className="py-3  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap px-2">
                    {student.submission === null
                      ? (
                      <span className="text-red-500">Belum Mengumpulkan</span>
                        )
                      : (
                      <span>
                        {moment(student.submission.createdAt).format('LLLL')}
                      </span>
                        )}
                  </span>
                </div>
              </td>

              {/* Status */}
              <td className="py-3  text-left">
                <div className="flex items-center justify-center">
                  <span className="font-medium whitespace-nowrap px-2">
                    {student.submission === null
                      ? (
                      <Tag color="#f50">Belum Mengumpulkan</Tag>
                        )
                      : (
                          submissionStatus(student.submission.updatedAt)
                        )}
                  </span>
                </div>
              </td>

              {/* Nilai */}
              <td className="py-3  text-left">
                <div className="flex items-center justify-center">
                  <span className="font-medium whitespace-nowrap px-2">
                    {student.submission === null
                      ? (
                      <Tag color="#f50">Belum Mengumpulkan</Tag>
                        )
                      : (
                      <Tag color="#108ee9">{student.submission.points}</Tag>
                        )}
                  </span>
                </div>
              </td>

              {/* AKSI */}
              <td className="py-3  text-left">
                <div className="flex items-center justify-center">
                  <button
                    disabled={student.submission === null}
                    onClick={() => navigate(`result/${student._id}`)}
                    className={`flex flex-row items-center justify-center space-x-2 ${
                      student.submission === null
                        ? 'bg-gray-500'
                        : 'bg-blue-500 hover:bg-blue-800'
                    } py-2 px-4 rounded-md duration-300 ease-in-out`}
                  >
                    <BsEye className="w-5 h-5 fill-white" />
                    <span className="font-medium text-white">Lihat Detail</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentEvaluation
