import { useEffect, useState } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { Image, Skeleton } from 'antd'
import moment from 'moment/moment'
import Cookies from 'js-cookie'

import FallBack from '../../assets/images/profile.png'

const StudentDetail = () => {
  // Use params
  const { studentId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Location
  const { pathname } = useLocation()
  const classLocation = pathname.split('/students')[0]

  // Local States
  const [student, setStudent] = useState(null)

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
      name: 'Detail Kelas',
      destination: `${classLocation}`
    },
    {
      name: 'Detail Siswa',
      destination: `${pathname}`
    }
  ]

  // Fetching student data
  const getStudentDetails = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const res = await api.get(`users/students/${studentId}`, config)
      // console.log(res)
      setStudent(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Initail fetch data
  useEffect(() => {
    getStudentDetails()
  }, [])

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full rounded-lg py-2 px-2 bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        <div className="flex w-full justify-center items-center h-10 sticky top-0 left-0 z-40">
          <h5 className="font-semibold text-lg text-center mb-0 text-black dark:text-white transition-all ease-in-out duration-300">
            Data Profil Siswa
          </h5>
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex flex-col lg:flex-row w-full items-start justify-start py-5 space-y-4 lg:space-y-0 overflow-auto text-black dark:text-white transition-all ease-in-out duration-300">
            <div className="flex w-full lg:w-1/3 items-center justify-center">
              {student
                ? (
                <Image
                  src={student.picture}
                  className="h-[80%] w-[60%]"
                  fallback={FallBack}
                />
                  )
                : (
                <Skeleton.Image active className="w-full h-full" />
                  )}
            </div>
            <div className="flex flex-col items-start justify-start w-full lg:w-2/3 h-full p-2 space-y-4">
              {student
                ? (
                <>
                  <Field label="Nama" value={student.fullName} />
                  <Field label="Email" value={student.email} />
                  <Field
                    label="Tanggal Lahir"
                    value={moment(new Date(student.dateOfBirth)).format('LL')}
                  />
                  <Field
                    label="Jenis Kelamin"
                    value={student.gender ? 'Lak-laki' : 'Perempuan'}
                  />
                  <Field label="No Telp" value={student.phone} />
                  <Field label="Alamat" value={student.address} />
                </>
                  )
                : (
                <Skeleton active paragraph={{ rows: 5 }} />
                  )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const Field = ({ label, value }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center justify-center">
      <div className="flex w-full lg:w-1/6 justify-center lg:justify-start">
        <p className="text-base mb-0">{label}</p>
      </div>

      <div className="flex w-full lg:w-5/6 justify-center lg:justify-start">
        <p className="text-lg font-semibold text-center lg:text-left mb-0">
          {value}
        </p>
      </div>
    </div>
  )
}

export default StudentDetail
