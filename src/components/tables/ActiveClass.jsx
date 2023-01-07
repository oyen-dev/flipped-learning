import { useAuth } from '../../contexts/Auth'

import { Spin } from 'antd'

const ActiveClass = (props) => {
  const { classes } = props

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 text-center overflow-clip whitespace-nowrap">
            No.
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            Nama
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            Kelas
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            Guru
          </th>
          <th className="py-3 px-5 text-cent overflow-cliper whitespace-nowrap">
            Jumlah Siswa
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light ">
        {classes === null
          ? (
            <tr
            className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300"
          >
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <Spin size="small" />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small' />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small' />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-start">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small' />
                </div>
              </div>
            </td>
            <td className="py-3 px-5 text-left overflow-clip">
              <div className="flex items-center justify-center">
                <div className="font-medium whitespace-nowrap">
                  <Spin size='small' />
                </div>
              </div>
            </td>
          </tr>
            )
          : classes.map((item, index) => {
            return (
            <tr
              className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300"
              key={index}
            >
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-center">
                  <span className="font-medium whitespace-nowrap">
                    {(index + 1)}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap">
                    {item.gradeId.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap">
                    {user.role === 'TEACHER' ? user.name : item.teachers[0].fullName}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-center">
                  <span className="font-medium whitespace-nowrap">
                    {item.students[0]}
                  </span>
                </div>
              </td>
            </tr>
            )
          }) }
      </tbody>
    </table>
  )
}

export default ActiveClass
