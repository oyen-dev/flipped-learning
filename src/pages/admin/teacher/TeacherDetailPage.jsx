import { useEffect, useState } from 'react'

import api from '../../../api'
import Layout from '../../../components/layouts'
import { Breadcrumb } from '../../../components/breadcrumb'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { Image, Skeleton } from 'antd'
import moment from 'moment/moment'
import Cookies from 'js-cookie'

import FallBack from '../../../assets/images/profile.png'

const TeacherDetailPage = () => {
  // Use params
  const { id } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Location
  const { pathname } = useLocation()
  const classLocation = pathname.split('/teachers')[0]
  const location = pathname.includes('classes')

  // Local States
  const [teacher, setTeacher] = useState(null)

  // Breadcrumb Items
  const paths = location
    ? [
        {
          name: 'Dashboard',
          destination: '/dashboard'
        },
        {
          name: 'Manajemen Kelas',
          destination: '/management/classes'
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
    : [
        {
          name: 'Dashboard',
          destination: '/dashboard'
        },
        {
          name: 'Manajemen Data Guru',
          destination: '/management/teachers'
        },
        {
          name: 'Detail Guru',
          destination: `/management/teachers/${id}`
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
      <div className="flex flex-col w-full bg-gray-900 rounded-lg py-2 px-2">
        <div className="flex w-full justify-center items-center h-10 sticky top-0 left-0 z-40">
          <h5 className="font-semibold text-lg text-center mb-0 text-white">
            Data Profil Guru
          </h5>
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex flex-col lg:flex-row w-full text-white items-start justify-start py-5 space-y-4 lg:space-y-0 overflow-auto">
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

export default TeacherDetailPage
