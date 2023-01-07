import { useState, useEffect } from 'react'

import api from '../../api'
import { Empty } from '../../pages/error'
import PresenceList from './PresenceList'

import { Spin } from 'antd'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const ClassPresences = () => {
  // useParams
  const { id: classId } = useParams()

  // Local States
  const [presences, setPresences] = useState(null)
  const [fetchPresences, setFetchPresences] = useState(true)

  // Get presences
  const getPresences = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${classId}/presences`, config)
      // console.log(data)

      const { data: presences } = data
      setPresences(presences)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially fetch data
  useEffect(() => {
    if (fetchPresences) {
      getPresences()
      setFetchPresences(false)
    }
  }, [fetchPresences])
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 space-y-4 rounded-lg text-black dark:text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
      {presences === null
        ? <Spin size='default' />
        : presences.length === 0
          ? <Empty message='Belum ada rekaman presensi di kelas.' />
          : <PresenceList presences={presences} />
      }
    </div>
  )
}

export default ClassPresences
