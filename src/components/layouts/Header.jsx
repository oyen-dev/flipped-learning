import { useAuth } from '../../contexts/Auth'
import { useGlobal } from '../../contexts/Global'

import { BsBoxArrowInRight, BsMoonStars, BsSun } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = ({ children }) => {
  // Global States
  const { globalState } = useGlobal()
  const { theme, setTheme } = globalState

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { setIsAuthenticated, setJwtToken, setUser, setSingleEmit, socket } = authState

  const handleTheme = () => {
    setTheme(!theme)
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    // Show success message using mySwal
    mySwal.fire({
      title: 'Apakah Anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove jwtToken from cookies
        Cookies.remove('jwtToken')
        setJwtToken(null)
        setIsAuthenticated(false)
        setUser({})
        setSingleEmit(true)
        socket.emit('req_offlineUser')

        mySwal.fire({
          title: 'See you again!',
          icon: 'info',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/auth')
        })
      }
    })
  }

  return (
    <div className="w-full flex items-center justify-between h-14 text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
      {/* Left empty space */}
      <div className="flex items-center justify-start md:justify-center w-14 lg:w-64 h-full bg-gray-900 border-none" />

      {/* Header container */}
      <div className="flex flex-col header-right h-full justify-center">
        {/* Flipped Learning and Logout */}
        <div className="flex w-full justify-between px-2 py-1">
          <p className="mb-0 font-semibold text-lg text-gray-900 dark:text-white transition-all duration-300 ease-in-out">
            Online Learning
          </p>
          <div className="flex flex-row items-center justify-items-center mb-0 space-x-6">
            <button onClick={handleTheme}>
              {theme
                ? (
                  <BsSun className="w-6 h-6 hover:fill-blue-500 dark:hover:fill-blue-500 fill-gray-900 dark:fill-white duration-300 ease-in-out"/>
                  )
                : (
                <BsMoonStars className="w-6 h-6 hover:fill-blue-500 dark:hover:fill-blue-500 fill-gray-900 dark:fill-white duration-300 ease-in-out"/>
                  )}
            </button>

            <button className="flex flex-row group items-center space-x-2" onClick={handleLogout}>
              <BsBoxArrowInRight className="w-6 h-6 fill-gray-900 group-hover:fill-blue-500 dark:fill-white duration-300 ease-in-out"/>
              <span className="mb-0 text-gray-900 dark:text-white group-hover:text-blue-500 duration-300 ease-in-out">
                Log Out
              </span>
            </button>
          </div>
        </div>
        {/* End Flipped Learning and Logout */}
      </div>
    </div>
  )
}

export default Header
