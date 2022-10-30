import { useGlobal } from '../../contexts/Global'
import { useManagement } from '../../contexts/Management'

import api from '../../api'

import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BsGear } from 'react-icons/bs'
import moment from 'moment'

const Class = (props) => {
  // Props destructure
  const { path, title, clases, schedule, mode } = props

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Management States
  const { managementStates } = useManagement()
  const { setIsFetchTeacher } = managementStates

  // Archive class
  const archiveClass = async (id, archive) => {
    // Show loading
    mySwal.fire({
      html: 'Wait a moment...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Configuration
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    const payload = {
      id,
      archive
    }

    // Archive class
    try {
      const { data } = await api.post('/class/archive', payload, config)
      // console.log(res)

      // Show success message
      mySwal.fire({
        icon: 'success',
        title: 'Success',
        text: data.message,
        showConfirmButton: false,
        timer: 2000
      }).then(() => setIsFetchTeacher(true))
    } catch (error) {
      console.log(error)
      // Show error message
      mySwal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
        showConfirmButton: false,
        timer: 2000
      }).then(() => setIsFetchTeacher(true))
    }
  }

  // Dialog for archive class
  const archiveClassDialog = () => {
    mySwal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Kelas yang diarsipkan tidak akan ditampilkan di halaman utama',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, arsipkan!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        archiveClass(path, true)
      }
    })
  }

  return (
    <div key={path} className="flex flex-col w-full items-center justify-center bg-[#e9ecef] text-black dark:bg-gray-700 dark:text-white px-5 pt-5 pb-2 rounded-md transition-all ease-in-out duration-300">
      <div className="flex flex-col w-full h-44 items-start justify-between bg-[url('/images/class.jpg')] bg-center object-contain object-center px-3 py-3 rounded-md">
        <div className="flex w-full items-center justify-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="">
              <BsGear className="w-6 h-6 cursor-pointer fill-white hover:fill-blue-500 duration-150" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu rounded-md p-2 shadow text-black dark:text-white bg-[#e9ecef] dark:bg-gray-700">
              {mode === 'active' &&
              <>
                <li className="whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700"><span>Edit Kelas</span></li>
                <li
                  className="whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => archiveClassDialog()}
                >
                  <span>Arsipkan Kelas</span>
                </li>
              </>
              }

              {mode === 'archived' || mode === 'deleted'
                ? <li className="whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700"><a>Kembalikan Kelas</a></li>
                : null
              }

              {mode === 'active' || mode === 'archived'
                ? <li className="whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 text-red-500"><a>Hapus Kelas</a></li>
                : null
              }
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
