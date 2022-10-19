import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Breadcrumb } from '../../../components/breadcrumb'
import Layout from '../../../components/layouts'
import { BorderBottom } from '../../../components/buttons'
import { ActiveClass, ArchivedClass, DeletedClass } from '../../../views/class'

const ManagementClassPage = () => {
  // Local States
  const [tabKey, setTabKey] = useState('1')
  const [tabs] = useState([
    {
      name: 'Daftar Kelas',
      tabId: '1'
    },
    {
      name: 'Arsip Kelas',
      tabId: '2'
    },
    {
      name: 'Kelas Dihapus',
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
      name: 'Manajemen Kelas',
      destination: '/management/classes'
    }
  ]

  // Todo : Filter class
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
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

        {tabKey === '1' ? <ActiveClass /> : tabKey === '2' ? <ArchivedClass /> : <DeletedClass />}
      </div>
    </Layout>
  )
}

export default ManagementClassPage
