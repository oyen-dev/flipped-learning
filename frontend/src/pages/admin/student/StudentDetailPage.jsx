import Layout from '../../../components/layouts'

import { Breadcrumb } from '../../../components/breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'

import { Image, Select } from 'antd'

const StudentDetailPage = () => {
  // Use params
  const { id } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Management Students',
      destination: '/management/students'
    },
    {
      name: id,
      destination: `/management/students/${id}`
    }
  ]

  return (
    <Layout>
        <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full bg-gray-900 rounded-lg py-2 px-2">
        <div className="flex w-full justify-center items-center h-10 sticky top-0 left-0 z-40">
          <h5 className="font-semibold text-lg text-center mb-0 text-white">
            Data Profil Siswa
          </h5>
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex flex-col lg:flex-row w-full text-white items-start justify-start py-5 space-y-4 lg:space-y-0 overflow-auto">
            <div className="flex w-full lg:w-1/3 items-center justify-center">
              <Image src="/images/pass.png" className="h-[80%] w-[60%]" />
            </div>
            <div className="flex flex-col items-start justify-start w-full lg:w-2/3 h-full p-2 space-y-4">
              <Field label="Nama" value="Catharina Novi Putri" />
              <Field label="Kelas" value="XI - Multimedia" />
              <Field label="Email" value="riinnaa21@gmail.com" />
              <Field label="No Telp" value="085 736 822 725" />
              <Field label="Alamat" value="Jl. Durian 25" />
              <Enrolled
                label="Kelas Diikuti"
                value={[
                  'Teknik Audio Video',
                  'Pemrograman Web',
                  'Desain Grafis',
                  'Dasar-dasar Keahlian Program'
                ]}
              />
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
          ></Select>
        </div>
      </div>
  )
}

export default StudentDetailPage
