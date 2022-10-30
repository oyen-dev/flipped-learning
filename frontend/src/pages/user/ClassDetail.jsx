import { useState } from 'react'

import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { BorderBottom } from '../../components/buttons'
import { InformationCenter } from '../../views/class'

import { useParams, useNavigate } from 'react-router-dom'

const ClassDetail = () => {
  // Use params
  const { id } = useParams()

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
    }
  ])

  // Navigator
  const navigate = useNavigate()

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
      destination: `/classes/${id}`
    }
  ]

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

      <InformationCenter id={id} />
    </Layout>
  )
}

export default ClassDetail
