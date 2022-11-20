import momentId from '../../constants/momentId'

import moment from 'moment/moment'
moment.defineLocale('id', momentId)

const StudentTasks = (props) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 pl-3 text-left">No</th>
          <th className="py-3 text-left">Nama</th>
          <th className="py-3 text-left">Tanggal Pengumpulan</th>
          <th className="py-3 text-center">Nilai</th>
          <th className="py-3 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light">
        <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
          <td className="py-3 text-left whitespace-nowrap">
            <div className="flex items-center pl-3 justify-start">
              <span className="font-medium">hjkasdad</span>
            </div>
          </td>
          <td className="py-3  text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">21eqwewqeqwe</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default StudentTasks
