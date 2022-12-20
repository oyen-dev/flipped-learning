import { useState, useEffect } from 'react'
import { useManagement } from '../../contexts/Management'

import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

const ClassHeader = (props) => {
  // Props destructure
  const { classData } = props

  // Navigator
  const navigate = useNavigate()

  // Current pathname
  const { pathname } = useLocation()

  // useParams
  const { id: classId } = useParams()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Management States
  const { managementStates } = useManagement()
  const { setPresenceClassId, setPresenceMode, fetchPresence, setFetchPresence } = managementStates

  // Local States
  const [isPresenceOpen, setIsPresenceOpen] = useState(null)

  // Check current presence is open or not
  const checkPresence = async () => {
    // Reset isPresenceOpen
    setIsPresenceOpen(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/presences/current`, config)
      // console.log(data)
      const { isOpen, isStudentPresent } = data.data

      const userRole = user && user.role
      const openStatus = userRole === 'TEACHER'
        ? isOpen
        : userRole === 'STUDENT'
          ? isOpen && !isStudentPresent
          : false

      setIsPresenceOpen(openStatus)
    } catch (error) {
      console.log(error)
    }
  }

  // Open modal
  const openModal = () => {
    // Set presence class id
    setPresenceClassId(classId)

    // Modal is from daisyUI, open it using dom manipulation
    document.getElementById('modal-presence').checked = true
  }

  // Open presence for teacher
  const openPresence = async () => {
    setPresenceMode('open')

    openModal()
  }

  // Edit presence for teacher
  const editPresence = async () => {
    setPresenceMode('edit')

    openModal()
  }

  // Presence for student
  const presenceNow = async () => {
    setPresenceMode('presence')

    openModal()
  }

  // Leave class
  const leaveClass = async () => {
    const payload = {
      invitation: classData.invitationCode,
      join: false
    }

    // Show loading
    mySwal.fire({
      title: 'Leaving class...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.post('/class/join', payload, config)
      // console.log(data)

      mySwal.fire({
        icon: 'success',
        title: data.message,
        text: "You'll be redirected to the class page",
        timer: 3000,
        showConfirmButton: false
      }).then(() => navigate('/classes'))
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  // Dialog for leaving class
  const leaveClassDialog = () => {
    mySwal.fire({
      title: 'Ingin keluar kelas?',
      text: 'Anda tidak akan bisa mengakses kelas ini lagi',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        leaveClass()
      }
    })
  }

  // Initally check presence is open or not
  useEffect(() => {
    checkPresence()
  }, [])

  // Monitor fetchPresence
  useEffect(() => {
    if (fetchPresence) {
      checkPresence()
      setFetchPresence(false)
    }
  }, [fetchPresence])
  return (
    <div className="w-full flex flex-col space-y-4">

      {/* Class Name */}
      <div className="flex w-full justify-center">
        <div className="text-center font-semibold text-lg md:text-2xl mb-0">
          {classData.name} - {classData.gradeId.name}
        </div>
      </div>

      <div className="w-full flex flex-col space-y-2 justify-start">

        {/* Class Teacher */}
        <div className="flex flex-row mb-0 text-xs md:text-base">
          <p className="mb-0">Pengajar</p>
          <div className="flex flex-col">
            {classData.teachers.map((teacher, index) => (
              <Link
                key={index}
                to={`${pathname}/teachers/${teacher._id}`}
                className="mb-0 ml-3 font-bold"
              >
                {teacher.fullName}
              </Link>
            ))}
          </div>
        </div>

        {/* Class Invitation Code */}
        <p className="mb-0 text-xs md:text-base">
          Kode Kelas:{' '}
          <span className="ml-3 font-bold tracking-wide">
            {classData.invitationCode}
          </span>
        </p>

        <div className="flex flex-row justify-between items-center">
            {/* Exit Class */}
            {user.role === 'STUDENT' && (
                <button
                onClick={() => leaveClassDialog()}
                className="mb-0 text-xs md:text-base text-red-500 whitespace-nowrap"
                >
                Batal Kelas?
                </button>
            )}

          {/* Presensi  */}
          <div className="flex w-full justify-end">
            <button
              disabled={user.role === 'STUDENT' ? !isPresenceOpen : false}
              onClick={() => {
                user.role === 'STUDENT'
                  ? presenceNow()
                  : isPresenceOpen
                    ? editPresence()
                    : openPresence()
              }}
              className={`py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium rounded-lg duration-300 ease-in-out
                ${!isPresenceOpen && user.role === 'STUDENT'
                    ? 'bg-gray-400 dark:bg-gray-400 cursor-not-allowed'
                    : 'bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4]'
                } 
              `}>
              {isPresenceOpen === null
                ? <Spin size="small" />
                : user.role === 'STUDENT'
                  ? 'Presensi Sekarang'
                  : isPresenceOpen
                    ? 'Edit Presensi'
                    : 'Buka Presensi'
              }
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ClassHeader
