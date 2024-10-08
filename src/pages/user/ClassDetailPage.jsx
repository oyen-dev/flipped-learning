import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { BorderBottom } from '../../components/buttons'
import { ClassHeader } from '../../components/card'
import { Presence } from '../../components/modals'
import { InformationCenter, ClassStudents, ClassTasks, ClassEvaluations, ClassPresences, ClassSummary } from '../../views/class'

import Cookies from 'js-cookie'
import { Spin } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'

const ClassDetailPage = () => {
  // Use params
  const { id } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Global States
  const { globalState } = useGlobal()
  const { tabKey, setTabKey } = globalState

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Local States
  const [classData, setClassData] = useState(null)
  const [tabs, setTabs] = useState(
    user && user.role === 'TEACHER'
      ? [
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
          },
          {
            name: 'Presensi',
            tabId: '5'
          }
        ]
      : [
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
          },
          {
            name: 'Rekap Studi',
            tabId: '5'
          }
        ]
  )

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

  // Get class detail
  const getClassDetail = async () => {
    // Config
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
    }
  }

  // Initial fetch data
  useEffect(() => {
    getClassDetail()
  }, [])

  // Monitor user
  useEffect(() => {
    setTabs(
      user && user.role === 'TEACHER'
        ? [
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
            },
            {
              name: 'Presensi',
              tabId: '5'
            }
          ]
        : [
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
            },
            {
              name: 'Rekap Studi',
              tabId: '5'
            }
          ]
    )
  }, [user])

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
        ? <Spin size='default'/>
        : <ClassHeader classData={classData} />
      }
    </div>

      {/* Class Content */}
      {tabKey === '1' && <InformationCenter id={id} />}
      {tabKey === '2' && <ClassStudents />}
      {tabKey === '3' && <ClassTasks />}
      {tabKey === '4' && <ClassEvaluations />}
      {user && user.role === 'TEACHER' && tabKey === '5' && <ClassPresences />}
      {user && user.role === 'STUDENT' && tabKey === '5' && <ClassSummary />}

      {/* Modal container */}
      <input
          type="checkbox"
          id="modal-presence"
          className="modal-toggle"
        />
        <Presence />
    </Layout>
  )
}

export default ClassDetailPage
