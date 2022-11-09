import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { BorderBottom } from '../../components/buttons'
import { InformationCenter, ClassStudents, ClassTasks, ClassEvaluations } from '../../views/class'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'

const ClassDetailPage = () => {
  // Use params
  const { id } = useParams()

  // Global States
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Get current path using router
  const { pathname } = useLocation()

  // Navigator
  const navigate = useNavigate()

  // Local States
  const [tabKey, setTabKey] = useState('1')
  const [tabs] = useState([
    {
      name: 'Pusat Informasi',
      tabId: '1'
    },
    {
      name: 'Siswa',
      tabId: '2'
    },
    {
      name: 'Penugasan',
      tabId: '3'
    },
    {
      name: 'Evaluasi',
      tabId: '4'
    }
  ])
  const [classData, setClassData] = useState(null)

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Daftar Kelas',
      destination: '/classes'
    },
    {
      name: 'Beranda Kelas',
      destination: `/classes/${id}`
    }
  ]

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
        if (error.response.status === 404) {
          navigate('/404')
        }
      } finally {
        mySwal.close()
      }
    }

    getClassDetail()
  }, [])

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />

      {/* Class Navigation */}
      <div className="flex flex-row w-full items-center justify-start md:justify-center overflow-x-auto space-x-4 pb-5 md:pb-0">
        {tabs.map((tab) => (
          <BorderBottom
            name={tab.name}
            tabId={tab.tabId}
            active={tabKey === tab.tabId}
            setTabKey={setTabKey}
            key={tab.tabId}
          />
        ))}
      </div>

      {/* Class Header */}
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
                <div className="flex flex-col">
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
                  <button className="py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium bg-[#fcfff7] dark:bg-[#34A0A4] hover:bg-gray-300 dark:hover:bg-[#3484a4] rounded-lg duration-300 ease-in-out">
                    {user.role === 'STUDENT' ? 'Presensi Sekarang' : 'Buka Presensi'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
          )}
    </div>

      {/* Class Content */}
      {tabKey === '1' && <InformationCenter id={id} />}
      {tabKey === '2' && <ClassStudents />}
      {tabKey === '3' && <ClassTasks />}
      {tabKey === '4' && <ClassEvaluations />}
    </Layout>
  )
}

export default ClassDetailPage
