/* eslint-disable react/prop-types */
const Header = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-between h-14 text-white z-10 bg-gray-800">
      <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h- bg-gray-800 border-none">
      </div>
      <div className="flex items-center h-14 header-right px-7 py-1">

       {children}

      </div>

        <ul className="flex justify-items-end mt-3">
          <li className="mx-5">
            <button
              aria-hidden="true"
              className="group p-2 transition-colors duration-200 rounded-full shadow-md bg-blue-200 hover:bg-blue-200 dark:bg-gray-50 dark:hover:bg-gray-200 text-gray-900 focus:outline-none"
            >
            <svg
              x-show="!isDark"
              width="24"
              height="24"
              className="fill-current text-gray-700 group-hover:text-gray-500 group-focus:text-gray-700 dark:text-gray-700 dark:group-hover:text-gray-500 dark:group-focus:text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke=""
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            </button>
          </li>

          <li className="mt-2">
            <a href="#" className="flex items-center mr-4 hover:text-blue-100">
              <span className="inline-flex mr-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </span>
              Logout
            </a>
          </li>
        </ul>
      </div>
  )
}

export default Header
