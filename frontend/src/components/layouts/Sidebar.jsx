import { useAuth } from '../../contexts/Auth'

import { Link } from 'react-router-dom'

import Pic from '../../assets/images/dummy.jpg'

const Sidebar = () => {
  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  return (
    <div className="fixed flex flex-col group top-0 left-0 w-14 group-hover:w-64 md:w-64 bg-[#accbe1] dark:bg-gray-900 h-full text-white transition-all ease-in-out duration-300 border-none z-10 sidebar">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden justify-between flex-grow pt-2">
        <ul className="flex flex-col py-2 space-y-1">
          <li className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center w-10/12">
              <div className="flex items-center justify-center object-cove">
                <img
                  src={user.picture ? user.picture : Pic}
                  alt="Profile"
                  className="w-[60%] items-center justify-center rounded-full md:p-2 object-cover overflow-hidden md:outline outline-offset-1 outline-white"
                />
              </div>
              <p className="hidden md:block group-hover:block truncate w-full text-sm text-center text-gray-900 dark:text-white transition-all duration-300 ease-in-out font-medium tracking-wide mb-0 pt-2">
                {user.name}
              </p>
            </div>
          </li>

          <Link to="/dashboard">
            <li className="pt-5">
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 dark:hover:bg-gray-700 text-white hover:text-blue-500 border-l-4 border-transparent hover:border-gray-800 pr-6 duration-150">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-house-door fill-gray-900 dark:fill-white duration-300 ease-in-out"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-900 dark:text-white duration-300 ease-in-out">
                  Dashboard
                </span>
              </div>
            </li>
          </Link>

          <Link to="/management/classes">
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 dark:hover:bg-gray-700 hover:text-blue-500 border-l-4 border-transparent hover:border-gray-800 pr-6 duration-150">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-grid fill-gray-900 dark:fill-white duration-300 ease-in-out"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-900 dark:text-white duration-300 ease-in-out">
                  Manajemen Kelas
                </span>
              </div>
            </li>
          </Link>

          <Link to="/management/teachers">
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 dark:hover:bg-gray-700 hover:text-blue-500 border-l-4 border-transparent hover:border-gray-800 pr-6 duration-150">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-people fill-gray-900 dark:fill-white duration-300 ease-in-out"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-900 dark:text-white duration-300 ease-in-out">
                  Manajemen Data Guru
                </span>
              </div>
            </li>
          </Link>

          <Link to="/management/students">
            <li>
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 dark:hover:bg-gray-700 hover:text-blue-500 border-l-4 border-transparent hover:border-gray-800 pr-6 duration-150">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-person-lines-fill fill-gray-900 dark:fill-white duration-300 ease-in-out"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-gray-900 dark:text-white duration-300 ease-in-out">
                  Manajemen Data Siswa
                </span>
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
