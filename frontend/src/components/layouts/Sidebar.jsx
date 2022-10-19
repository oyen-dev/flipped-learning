import { useAuth } from '../../contexts/Auth'

import { Link } from 'react-router-dom'

const Sidebar = () => {
  // Auth States
  const { authState } = useAuth()
  const { user } = authState
  const { picture, name, role } = user

  return (
    <div className="fixed flex flex-col group top-0 left-0 w-14 group-hover:w-64 md:w-64 bg-[#accbe1] dark:bg-gray-900 h-full text-white transition-all ease-in-out duration-300 border-none z-10 sidebar">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden justify-between flex-grow pt-2">
        <ul className="flex flex-col py-2 space-y-1">
          <li className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center w-10/12">
              <div className="flex items-center justify-center object-cove">
                <img
                  src={picture}
                  alt="Profile"
                  className="w-[60%] items-center justify-center rounded-full md:p-2 object-cover overflow-hidden md:outline outline-offset-1 outline-white"
                />
              </div>
              <p className="hidden md:block group-hover:block truncate w-full text-sm text-center text-gray-900 dark:text-white transition-all duration-300 ease-in-out font-medium tracking-wide mb-0 pt-2">
                {name}
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

          {role === 'ADMIN' && (
            <>
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
            </>
          )}

          {role === 'TEACHER' || role === 'STUDENT'
            ? (
            <>
              <Link to="/classes">
                <li>
                  <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 dark:hover:bg-gray-700 hover:text-blue-500 border-l-4 border-transparent hover:border-gray-800 pr-6 duration-150">
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-book fill-gray-900 dark:fill-white duration-300 ease-in-out"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate text-gray-900 dark:text-white duration-300 ease-in-out">
                      Kelas
                    </span>
                  </div>
                </li>
              </Link>
            </>
              )
            : null}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
