import { useState, useEffect } from 'react'
import Smile1 from '../../assets/images/1.png'
import Smile2 from '../../assets/images/2.png'
import Smile3 from '../../assets/images/3.png'
import Smile4 from '../../assets/images/4.png'
import Smile5 from '../../assets/images/5.png'
import momentId from '../../constants/momentId'

import api from '../../api'

import Cookies from 'js-cookie'
import { Spin, Tag } from 'antd'
import moment from 'moment/moment'
import { useParams } from 'react-router-dom'

moment.updateLocale('id', momentId)

const StudentPresences = (props) => {
  // Props destructuring
  const { presenceId } = props

  // useParams
  const { id: classId } = useParams()

  // Local States
  const [presenceDetail, setPresenceDetail] = useState(null)
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
      title: 'KEHADIRAN',
      width: 30,
      align: 'text-center'
    },
    {
      title: 'REAKSI',
      width: 20,
      align: 'text-center'
    },
    {
      title: 'JAM MASUK',
      width: 20,
      align: 'text-center'
    }
  ])

  // Get presence detail
  const getPresenceDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(
        `/class/${classId}/presences/detail/${presenceId}`,
        config
      )
      console.log(data)

      setPresenceDetail(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Define reaction
  const defineReaction = (reaction) => {
    let emoji = <Tag color="#f50">Tidak Hadir</Tag>

    if (reaction === 1) {
      emoji = <img src={Smile1} alt="emoji" className="w-8 h-8" />
    } else if (reaction === 2) {
      emoji = <img src={Smile2} alt="emoji" className="w-8 h-8" />
    } else if (reaction === 3) {
      emoji = <img src={Smile3} alt="emoji" className="w-8 h-8" />
    } else if (reaction === 4) {
      emoji = <img src={Smile4} alt="emoji" className="w-8 h-8" />
    } else if (reaction === 5) emoji = <img src={Smile5} alt="emoji" className="w-8 h-8" />

    return emoji
  }

  // Define attendance
  const defineAttendance = (attendance) => {
    if (attendance === 1) return <Tag color="#87d068">Hadir</Tag>
    if (attendance === 2) return <Tag color="#108ee9">Sakit</Tag>
    if (attendance === 3) return <Tag color="#faad14">Izin</Tag>
    if (attendance === null) return <Tag color="#f50">Tidak Hadir</Tag>
  }

  // Define time
  const defineTime = (time) => {
    if (time === null) return <Tag color="#f50">Tidak Hadir</Tag>
    return <Tag color="#87d068">{moment(time).format('HH:mm')}</Tag>
  }

  // Initially get presence detail
  useEffect(() => {
    getPresenceDetail()
  }, [])

  return (
    <>
      {presenceDetail !== null
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
              {presenceDetail.studentPresences.map((presence, index) => (
                <tr key={index} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
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
                      {presence.student.fullName}
                    </span>
                  </div>
                </td>

                {/* Kehadiran */}
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center">
                    <span className="font-medium whitespace-nowrap px-2">
                      {defineAttendance(presence.attendance)}
                    </span>
                  </div>
                </td>

                {/* Reaksi */}
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center">
                    <span className="font-medium whitespace-nowrap px-2">
                      {defineReaction(presence.reaction)}
                    </span>
                  </div>
                </td>

                {/* Jam Masuk */}
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center">
                    <span className="font-medium whitespace-nowrap px-2">
                      {defineTime(presence.at)}
                    </span>
                  </div>
                </td>

              </tr>
              ))}
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

export default StudentPresences
