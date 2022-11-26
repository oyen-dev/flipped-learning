import momentId from '../../constants/momentId'

import moment from 'moment/moment'
import { Link } from 'react-router-dom'

moment.updateLocale('id', momentId)
const StudentList = (props) => {
  // Destructure props
  const { student } = props
  const { _id, fullName, picture, logs } = student

  return (
    <div className="flex flex-row items-center justify-between w-full px-2 py-2 rounded-lg bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300">
        <Link to={`students/${_id}`} className="flex flex-row space-x-4 items-center">
            {/* Full rounded picture */}
            <img
              className="w-12 h-12 rounded-full bg-gray-500 object-contain"
              src={picture}
            />
            {/* Student name */}
            <span
              className="text-sm lg:text-base font-semibold text-black dark:text-white hover:text-blue-500 hover:dark:text-blue-500 duration-150 ease-in-out"
            >
              {fullName}
            </span>
        </Link>

        <div className="flex flex-col items-end justify-center">
            <p className='mb-0 text-xs'>Terakhir online:</p>
            <p className='mb-0 text-sm'>
              {logs.length > 0 ? moment(logs[0].at).format('LLLL') : 'Belum pernah aktif'}
            </p>
        </div>
    </div>
  )
}

export default StudentList
