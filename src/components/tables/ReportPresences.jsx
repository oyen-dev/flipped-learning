import momentId from '../../constants/momentId'
import { useState } from 'react'

import moment from 'moment/moment'
import { Tag } from 'antd'

moment.updateLocale('id', momentId)

const ReportPresences = (props) => {
  // Props destructure
  const { presences } = props

  // Table columns
  const [columns] = useState([
    {
      title: 'NO',
      width: 5,
      align: 'pl-3 text-left'
    },
    {
      title: 'JAM DIBUKA',
      width: 10,
      align: 'text-left'
    },
    {
      title: 'JAM DITUTUP',
      width: 10,
      align: 'text-left'
    },
    {
      title: 'KEHADIRAN',
      width: 75,
      align: 'text-center'
    }
  ])

  // Define attendance
  const defineAttendance = (attendance) => {
    if (attendance === 1) return <Tag color="#87d068">Hadir</Tag>
    if (attendance === 2) return <Tag color="#108ee9">Sakit</Tag>
    if (attendance === 3) return <Tag color="#faad14">Izin</Tag>
    else return <Tag color="#f50">Tidak Hadir</Tag>
  }

  return (
    <div className="flex flex-col w-full space-y-4 overflow-x-auto">
      <h3 className="text-center text-black dark:text-white text-xl font-bold">
        Rekap Presensi
      </h3>
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
          {presences.length !== 0
            ? (
                presences.map((presence, index) => (
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

                {/* Jam Dibuka */}
                <td className="py-3  text-left">
                  <div className="flex items-center justify-start">
                    <span className="font-medium whitespace-nowrap">
                      {moment(presence.start).format(
                        'dddd, DD MMMM YYYY HH:mm'
                      )}
                    </span>
                  </div>
                </td>

                {/* Jam Ditutup */}
                <td className="py-3  text-left">
                  <div className="flex items-center justify-start">
                    <span className="font-medium whitespace-nowrap">
                      {moment(presence.end).format('dddd, DD MMMM YYYY HH:mm')}
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
              </tr>
                ))
              )
            : (
            <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
              {/* Tidak ada data */}
              <td colSpan={4} className="py-3 text-center">
                <div className="flex items-center pl-3 justify-center">
                  <span className="font-medium whitespace-nowrap px-2">
                    Belum ada data
                  </span>
                </div>
              </td>
            </tr>
              )}
        </tbody>
      </table>
    </div>
  )
}

export default ReportPresences
