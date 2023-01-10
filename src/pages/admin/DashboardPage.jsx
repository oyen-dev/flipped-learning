import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'

import Layout from '../../components/layouts'
import { RecentAccess, ActiveClass } from '../../components/tables'
import { Statistic } from '../../views/dashboard'
import { VideoGuide } from '../../components/modals'

import { BsInfoCircle } from 'react-icons/bs'
import api from '../../api'
import Cookies from 'js-cookie'

const DashboardPage = () => {
  // Global States
  const { globalState } = useGlobal()
  const { setPlay } = globalState

  // Local States
  const [dashboardData, setDashboardData] = useState({
    data: {
      recent: {
        logs: null
      },
      statistic: {
        totalTeachers: null,
        totalStudents: null,
        ratio: null
      },
      classes: null
    }
  })

  // Get dashboard data
  const getDashboardData = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get('/users/dashboard', config)
      // console.log(data)
      setDashboardData(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial fetch
  useEffect(() => {
    const asyncGetDashboardData = async () => {
      await getDashboardData()
    }
    asyncGetDashboardData()
  }, [])

  return (
    <Layout>
      <div className="flex flex-col w-full h-full items-start ">
        <div className="flex flex-row space-x-2 items-center">
          <BsInfoCircle className="fill-black dark:fill-white w-5 h-5 transition-all ease-in-out duration-300" />
          <p className="mb-0 text-sm text-black dark:text-white transition-all ease-in-out duration-300">
            Video panduan Online Learning dapat dilihat{' '}
            <label
              htmlFor="modal-video-guide"
              className="modal-button font-bold hover:text-blue-500 duration-150 cursor-pointer"
              onClick={() => setPlay(true)}
            >
              disini.
            </label>
          </p>
        </div>
      </div>
      <div className="w-full grid auto-rows-auto lg:grid-cols-2 gap-5">
        <div className="flex flex-col w-full items-center lg:items-start justify-start text-gray-900 dark:text-white bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
          <p className="text-base font-semibold pb-5 mb-0">
            Riwayat Akses Terkini
          </p>
          <RecentAccess logs={dashboardData.data.recent.logs} />
        </div>

        <div className="flex flex-col w-full items-center lg:items-start justify-start text-gray-900 dark:text-white bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
          <p className="text-base font-semibold pb-5 mb-0">
            Statistik Warga Sekolah
          </p>
          <Statistic statistic={dashboardData.data.statistic} />
        </div>
      </div>
      <div className="flex flex-col w-full items-center lg:items-start justify-start text-gray-900 dark:text-white bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
        <p className="text-base font-semibold pb-5 mb-0">Daftar Kelas Aktif</p>
        <div className="flex flex-col w-full items-start justify-start overflow-x-auto">
          <ActiveClass classes={dashboardData.data.classes} />
          <div className="flex w-full mt-5 lg:mt-0 justify-center items-center" />
        </div>
      </div>

      {/* Modal container */}
      <input
        type="checkbox"
        id="modal-video-guide"
        className="modal-toggle"
      />
      <VideoGuide />

    </Layout>
  )
}

export default DashboardPage
