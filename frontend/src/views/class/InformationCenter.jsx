import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/Global'

import { PostTaskInfo } from '../../components/forms'

import { Spin } from 'antd'
import api from '../../api'
import Cookies from 'js-cookie'

const InformationCenter = (props) => {
  // Props destructure
  const { id } = props

  // Global States
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [classData, setClassData] = useState(null)

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
        console.log(data)
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
            <div className="w-full flex flex-col justify-start">
              <div className="flex flex-row mb-0 text-xs md:text-base">
                <p className='mb-0'>Pengajar</p>
                <div className="flex flex-col w-full">
                  {classData.teachers.map((teacher, index) => (
                    <a key={index} href={teacher._id} className="ml-3 font-bold">{teacher.fullName}</a>
                  ))}
                </div>
              </div>
              <p className="mb-0 text-xs md:text-base">
                Kode Kelas: <span className="ml-3 font-bold tracking-wide">{classData.invitationCode}</span>
              </p>
            </div>
          </div>

          {/* Presensi  */}
          <div className="flex w-full justify-end">
            <button className="py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium bg-[#fcfff7] dark:bg-[#34A0A4] rounded-lg">
              Buka Presensi
            </button>
          </div>

          {/* Posting Informasi */}
          <PostTaskInfo />
        </>
          )}
    </div>
  )
}

export default InformationCenter
