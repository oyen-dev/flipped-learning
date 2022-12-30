import momentId from '../../constants/momentId'
import { useAuth } from '../../contexts/Auth'

import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import { BsEye } from 'react-icons/bs'

moment.updateLocale('id', momentId)

const StudentList = (props) => {
  // Destructure props
  const { student } = props
  const { _id, fullName, picture, logs } = student

  // Auth States
  const { authState } = useAuth()
  const { user } = authState
  console.log(user)

  return (
    <div className="flex flex-row items-center justify-between w-full px-2 py-2 rounded-lg bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300">
      <Link
        to={`students/${_id}`}
        className="flex flex-row space-x-4 items-center"
      >
        {/* Full rounded picture */}
        <img
          className="w-12 h-12 rounded-full bg-gray-500 object-contain"
          src={picture}
        />
        {/* Student name */}
        <span className="text-sm lg:text-base font-semibold text-black dark:text-white hover:text-blue-500 hover:dark:text-blue-500 duration-150 ease-in-out">
          {fullName}
        </span>
      </Link>

      <div className="flex flex-row items-end space-x-4 justify-center">
        {user && user.role === 'TEACHER' &&
          <Link to={`result/${_id}`} className="flex flex-row items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-800 py-2 px-4 rounded-md duration-300 ease-in-out">
            <BsEye className="fill-white w-5 h-5" />
            <span className='text-white hover:text-white'>Rekap Studi</span>
        </Link>
        }

        <div className="flex flex-col space-y-1 justify-end">
          <p className="mb-0 text-xs">Terakhir online:</p>
          <p className="mb-0 text-sm">
            {logs.length > 0
              ? moment(logs[0].at).format('LLLL')
              : 'Belum pernah aktif'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentList
