import { useState } from 'react'

import tabData from '../../../constants/tabData'
import Layout from '../../../components/layouts'
import { BorderBottom } from '../../../components/buttons'
import { ActiveClass, ArchivedClass, DeletedClass } from '../../../views/class'

const ManagementClassPage = () => {
  // Local States
  const [tabKey, setTabKey] = useState('1')
  const [tabs] = useState(tabData)

  // Todo : Filter class
  return (
    <Layout>
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
