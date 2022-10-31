import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import { PostTaskInfo } from '../../components/forms'
import PostList from './PostList'

import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Spin } from 'antd'
import api from '../../api'
import Cookies from 'js-cookie'

const InformationCenter = (props) => {
  // Props destructure
  const { id } = props

  // Global States
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Navigator
  const navigate = useNavigate()

  // Get current path using router
  const { pathname } = useLocation()

  // Local States
  const [classData, setClassData] = useState(null)

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
        timer: 3000,
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

  // Initial fetch data
  useEffect(() => {
    const getClassDetail = async () => {
      // Show Loading
      mySwal.fire({
        html: 'Wait a moment...',
        didOpen: () => {
          mySwal.showLoading()
        }
      })

      const config = {
        headers: {
          authorization: `Bearer ${Cookies.get('jwtToken')}`
        }
      }
      try {
        const { data } = await api.get(`/class/${id}`, config)
        // console.log(data)
        setClassData(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        mySwal.close()
      }
    }

    getClassDetail()
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 space-y-4 rounded-lg text-black dark:text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
      {classData === null
        ? (
        <Spin />
          )
        : (
        <>
          {/* Class Header Info */}
          <div className="w-full flex flex-col space-y-4">
            <div className="flex w-full justify-center">
              <div className="text-center font-semibold text-lg md:text-2xl mb-0">
                {classData.name} - {classData.gradeId.name}
              </div>
            </div>
            <div className="w-full flex flex-col space-y-2 justify-start">
              <div className="flex flex-row mb-0 text-xs md:text-base">
                <p className='mb-0'>Pengajar</p>
                <div className="flex flex-col w-full">
                  {classData.teachers.map((teacher, index) => (
                    <Link key={index} to={`${pathname}/teachers/${teacher._id}`} className="mb-0 ml-3 font-bold">{teacher.fullName}</Link>
                  ))}
                </div>
              </div>
              <p className="mb-0 text-xs md:text-base">
                Kode Kelas: <span className="ml-3 font-bold tracking-wide">{classData.invitationCode}</span>
              </p>

              <div className="flex flex-row justify-between items-center">
                {user.role === 'STUDENT' && (
                  <button
                    onClick={() => leaveClassDialog()}
                    className="mb-0 text-xs md:text-base text-red-500 whitespace-nowrap">
                    Batal Kelas?
                  </button>
                )}

                {/* Presensi  */}
                <div className="flex w-full justify-end">
                  <button className="py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium bg-[#fcfff7] dark:bg-[#34A0A4] rounded-lg">
                    {user.role === 'STUDENT' ? 'Presensi Sekarang' : 'Buka Presensi'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posting Informasi */}
          {user.role === 'TEACHER' || user.role === 'ADMIN' ? <PostTaskInfo /> : null}

          {/* Class Posts */}
          <PostList posts={classData.posts}/>
        </>
          )}
    </div>
  )
}

export default InformationCenter
