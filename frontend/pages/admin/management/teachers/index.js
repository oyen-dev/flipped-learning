import Layout from '../../../../components/layout'
import UserManagementGuru from '../../../../components/table/UserManagementGuru'
import UserPagination from '../../../../components/table/UserPagination'
import ModalCreateUser from '../../../../components/modal/ModalCreateUser'

const user = () => {
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
