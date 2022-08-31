import { useState, useEffect } from 'react'

import Layout from '../../../components/layout'
import BorderBottom from '../../../components/button/BorderBottom'
import Class from '../../../components/card/Class'
import FilterOption from '../../../components/input/FilterOption'

import classData from '../../../constants/classData'
import tabData from '../../../constants/tabData'

import { Input } from 'antd'

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  )
}

const Classes = () => {
  const [tabKey, setTabKey] = useState('1')
  const [clases, setClases] = useState(classData)
  const [tempClasses, setTempClasses] = useState(classData)
  const [tabs, setTabs] = useState(tabData)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setTempClasses(classData)

    setClases(classData.filter(({ name }) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
  }, [search])

  return (
    <Layout
      title="Manajemen Data Kelas"
      description="Dashboard Flipped Learning"
      keywords="flipped learning, universitas bina bangsa getsempena"
      author="Admin"
      ogTitle="Admin"
      ogDescription="Admin page"
      ogImage="https://www.example.com/image.jpg"
    >
      <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
        <div className="flex flex-row w-full items-center justify-start lg:justify-center overflow-x-auto space-x-4 pb-5 lg:pb-0">
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

        <div className="flex flex-col w-full items-end justify-center">
          <div className="flex flex-col lg:flex-row w-full lg:w-2/5 space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
            <FilterOption />
            <Input
              placeholder="Cari Kelas"
              prefix={<SearchIcon />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid w-full auto-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
          {clases.map((kelas) => (
            <Class key={kelas.id} title={kelas.name} clases={kelas.class} />
          ))}
        </div>

        <button
          title="Contact Us"
          className="fixed z-40 bottom-8 right-8 bg-[#34A0A4] w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-[#7C3AED] hover:drop-shadow-2xl duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
      </div>
    </Layout>
  )
}

export default Classes
