import Layout from '../../../../components/layout'
import BorderBottom from '../../../../components/button/BorderBottom'

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

const FilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-filter-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
    </svg>
  )
}

const index = () => {
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
      <div className="flex flex-col w-full items-start justify-start space-y-5">
        <div className="flex flex-row w-full items-center justify-start lg:justify-center overflow-x-auto space-x-4 pb-5 lg:pb-0">
          <BorderBottom name="Daftar Kelas" />
          <BorderBottom name="Arsip Kelas" />
          <BorderBottom name="Kelas Dihapus" />
        </div>

        <div className="flex flex-col w-full items-end justify-center">
          <div className="flex flex-col lg:flex-row w-full lg:w-2/5 space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
            <Input placeholder="Filter Kelas" prefix={<FilterIcon />} />
            <Input placeholder="Cari Kelas" prefix={<SearchIcon />} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default index
