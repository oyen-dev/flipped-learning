import { useEffect, useState } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { Image, Select, Skeleton } from 'antd'
import moment from 'moment/moment'
import Cookies from 'js-cookie'

import FallBack from '../../assets/images/profile.png'

const TeacherList = () => {
  // Use params
  const { id } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Location
  const { pathname } = useLocation()
  const classLocation = pathname.split('/teachers')[0]

  // Local States
  const [teacher, setTeacher] = useState(null)

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
      name: 'Detail Guru',
      destination: `${pathname}`
    }
  ]

  // Fetching teacher data
  const getTeacherDetails = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    const res = await api.get(`users/teachers/${id}`, config)
    setTeacher(res.data.data)
  }

  // Initail fetch data
  useEffect(() => {
    getTeacherDetails()
  }, [])

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full rounded-lg py-2 px-2 bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        <div className="flex w-full justify-center items-center h-10 sticky top-0 left-0 z-40">
          <h5 className="font-semibold text-lg text-center mb-0 text-black dark:text-white transition-all ease-in-out duration-300">
            Data Profil Guru
          </h5>
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex flex-col lg:flex-row w-full items-start justify-start py-5 space-y-4 lg:space-y-0 overflow-auto text-black dark:text-white transition-all ease-in-out duration-300">
            <div className="flex w-full lg:w-1/3 items-center justify-center">
              {teacher
                ? (
                <Image
                  src={teacher.picture}
                  className="h-[80%] w-[60%]"
                  fallback={FallBack}
                />
                  )
                : (
                <Skeleton.Image active className="w-full h-full" />
                  )}
            </div>
            <div className="flex flex-col items-start justify-start w-full lg:w-2/3 h-full p-2 space-y-4">
              {teacher
                ? (
                <>
                  <Field label="Nama" value={teacher.fullName} />
                  <Field label="Email" value={teacher.email} />
                  <Field
                    label="Tanggal Lahir"
                    value={moment(teacher.dateOfBirth).format('LL')}
                  />
                  <Field
                    label="Jenis Kelamin"
                    value={teacher.gender ? 'Lak-laki' : 'Perempuan'}
                  />
                  <Field label="No Telp" value={teacher.phone} />
                  <Field label="Alamat" value={teacher.address} />
                  <Enrolled
                    label="Kelas Diampu"
                    value={[
                      'Teknik Audio Video',
                      'Pemrograman Web',
                      'Desain Grafis',
                      'Dasar-dasar Keahlian Program'
                    ]}
                  />
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

const Enrolled = ({ label, value }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center">
      <div className="flex w-full lg:w-1/6 justify-center lg:justify-start">
        <p className="text-base mb-0">{label}</p>
      </div>

      <div className="flex flex-col w-full space-y-4 lg:w-5/6 justify-center lg:justify-start mt-2 lg:mt-0">
        <Select
          mode="multiple"
          disabled
          style={{
            width: '100%'
          }}
          placeholder="Please select"
          defaultValue={value}
        />
      </div>
    </div>
  )
}

export default TeacherList
