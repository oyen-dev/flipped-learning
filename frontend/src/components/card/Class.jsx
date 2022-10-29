import { Link } from 'react-router-dom'

import { BsGear } from 'react-icons/bs'
import moment from 'moment'

const Class = (props) => {
  const { path, title, clases, schedule } = props

  return (
    <div key={path} className="flex flex-col w-full items-center justify-center bg-[#accbe1] text-black dark:bg-gray-700 dark:text-white px-5 pt-5 pb-2 rounded-md transition-all ease-in-out duration-300">
      <div className="flex flex-col w-full h-44 items-start justify-between bg-[url('/images/class.jpg')] bg-center object-contain object-center px-3 py-3 rounded-md">
        <div className="flex w-full items-center justify-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="">
              <BsGear className="w-6 h-6 cursor-pointer fill-white hover:fill-blue-500 duration-150" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu rounded-md p-2 shadow text-white bg-gray-700">
              <li className="whitespace-nowrap hover:bg-gray-700"><a>Edit Kelas</a></li>
              <li className="whitespace-nowrap hover:bg-gray-700"><a>Arsipkan Kelas</a></li>
              <li className="whitespace-nowrap hover:bg-gray-700 text-red-500"><a>Hapus Kelas</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-full items-start justify-start text-white">
          {schedule.map((item, index) => {
            const { start, end } = item

            // Set moment locale to indonesia
            moment.locale('id')
            const formattedStart = moment(start).format('dddd')
            const startTime = moment(start).format('HH:mm')
            const endTime = moment(end).format('HH:mm')
            return (
              <p key={index} className="mb-0 text-xs hover:font-semibold duration-150 ease-in">
                {formattedStart}, {startTime} - {endTime}
              </p>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-center space-y-1 pt-2">
        <Link to={`/management/classes/${path}`}>
          <p className="mb-0 text-gray-900 dark:text-white dark:hover:text-blue-500 text-center font-bold text-base duration-150 ease-in">{title}</p>
        </Link>
        <p className="mb-0 text-center text-sm font-thin whitespace-nowrap">
          {clases}
        </p>
      </div>
    </div>
  )
}

export default Class
