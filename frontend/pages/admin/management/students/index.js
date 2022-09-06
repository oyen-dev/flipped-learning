import Layout from '../../../../components/layout'
import UserManagementSiswa from '../../../../components/table/UserManagementSiswa'
import ModalCreateUser from '../../../../components/modal/ModalCreateUser'
import { Input } from 'antd'

const user = () => {
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
  return (
    <Layout
      title="Admin"
      description="Admin page for user management"
      keywords="Admin page user management"
      author="Admin"
      ogTitle="Admin"
      ogDescription="Admin page for user management"
      ogImage="https://www.example.com/image.jpg"
    >
      <div className="flex flex-col lg:flex-row w-full h-full items-end lg:items-center justify-end space-y-4 lg:space-y-0">
        <label
          htmlFor="my-modal-create"
          className="btn btn-sm bg-[#34A0A4] modal-button hover:bg-blue-700 hover:drop-shadow-2xl duration-300"
        >
          <p className="font-medium capitalize text-sm text-white mb-0">
            Tambah Siswa
          </p>
        </label>

        <div className="flex flex-col w-full items-end justify-center">
          <div className="flex flex-col lg:flex-row w-full lg:w-1/5 space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
            <Input placeholder="Cari Data Siswa" prefix={<SearchIcon />} />
          </div>
        </div>

        <input type="checkbox" id="my-modal-create" className="modal-toggle" />
        <ModalCreateUser />
      </div>

      <div className="flex flex-col w-full items-center lg:items-start justify-start bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
        <p className="text-base font-semibold pb-5 mb-0 text-gray-900 dark:text-white transition-all duration-300 ease-in-out">Daftar Siswa</p>
        <div className="flex flex-col w-full items-start justify-start overflow-x-auto">
          <UserManagementSiswa />
          <div className="flex w-full mt-5 lg:mt-0 justify-center items-center" />
        </div>
      </div>
    </Layout>
  )
}

export default user
