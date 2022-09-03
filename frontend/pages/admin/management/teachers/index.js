import Layout from '../../../../components/layout'
import UserManagementGuru from '../../../../components/table/UserManagementGuru'
import UserPagination from '../../../../components/table/UserPagination'
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
      <div className="flex w-full h-full items-center justify-end">
        <label
          htmlFor="my-modal-create"
          className="btn bg-[#34A0A4] btn-sm modal-button hover:bg-blue-700 hover:drop-shadow-2xl duration-300"
        >
          <p className="font-medium capitalize text-sm text-white mb-0">
            Tambah User
          </p>
        </label>

        <div className="flex flex-col w-full items-end justify-center">
          <div className="flex flex-col lg:flex-row w-full lg:w-1/5 space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
            <Input placeholder="Cari nama" prefix={<SearchIcon />} />
          </div>
        </div>

        <input type="checkbox" id="my-modal-create" className="modal-toggle" />
        <ModalCreateUser />
      </div>

      <div className="flex flex-col w-full items-center lg:items-start justify-start bg-gray-900 px-5 py-5 rounded-lg">
        <p className="text-base font-semibold pb-5 mb-0">Daftar Guru</p>
        <div className="flex flex-col w-full items-start justify-start overflow-x-auto">
          <UserManagementGuru />
          <div className="flex w-full mt-5 lg:mt-0 justify-center items-center" />
        </div>
        <UserPagination />
      </div>
    </Layout>
  )
}

export default user
