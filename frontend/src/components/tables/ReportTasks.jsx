import momentId from '../../constants/momentId'
import { useState } from 'react'

import moment from 'moment/moment'
import { Tag } from 'antd'

moment.updateLocale('id', momentId)

const ReportTasks = (props) => {
  // Props destructure
  const { tasks } = props
  console.log(tasks)

  // Table columns
  const [columns] = useState([
    {
      title: 'NO',
      width: 5,
      align: 'pl-3 text-left'
    },
    {
      title: 'NAMA TUGAS',
      width: 75,
      align: 'text-left'
    },
    {
      title: 'NILAI',
      width: 20,
      align: 'text-center'
    }
  ])

  // Define point color
  const pointColor = (point) => {
    let color = '#f50'

    if (point >= 81) color = '#108ee9'
    else if (point >= 71 && point < 80) color = '#87d068'
    else if (point >= 60 && point <= 70) color = '#faad14'

    return (
      <Tag color={color} className="text-white">
        {point}
      </Tag>
    )
  }

  return (
    <div className="flex flex-col w-full space-y-4 overflow-x-auto">
      <h3 className="text-center text-black dark:text-white text-xl font-bold">
        Rekap Penugasan
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
          {tasks.map((task, index) => (
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

              {/* Nama Tugas */}
              <td className="py-3 text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap px-2">
                    {task.title}
                  </span>
                </div>
              </td>

              {/* Nilai */}
              <td className="py-3  text-left">
                <div className="flex items-center justify-center">
                  <span className="font-medium whitespace-nowrap px-2">
                    {task.points === null
                      ? (
                      <Tag color="#faad14">Belum Dinilai</Tag>
                        )
                      : (
                          pointColor(task.points)
                        )}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTasks
