import { useState, useEffect } from 'react'

import api from '../../api'
import { StudentList } from '../../components/card'
import { Empty } from '../../pages/error'

import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

const ClassStudents = () => {
  // use params
  const { id } = useParams()

  // Local States
  const [students, setStudents] = useState(null)

  // Get class students
  const getClassStudents = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/class/${id}/students`, config)
      // console.log(data)

      // Set students
      const { students } = data.data
      setStudents(students)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial get class students
  useEffect(() => {
    getClassStudents()
  }, [])
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 px-4 space-y-4 rounded-lg text-black dark:text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
      {students
        ? students.length > 0
          ? students.map((student, index) => (
              <StudentList key={index} student={student} />
          ))
          : <Empty message='Belum ada siswa di kelas.' />
        : <Spin />
      }
    </div>
  )
}

export default ClassStudents
