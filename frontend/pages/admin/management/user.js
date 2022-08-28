import Layout from '../../../components/layout'
import UserManagement from '../../../components/table/UserManagement'
import UserPagination from '../../../components/table/UserPagination'
import ModalCreateUser from '../../../components/modal/ModalCreateUser'

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
      <div className="pr-10 flex justify-end">
        <label htmlFor="my-modal-create" className="btn btn-primary modal-button">
          <p className="font-medium text-lg text-white mb-0">Tambah User</p>
        </label>
        <input type="checkbox" id="my-modal-create" className="modal-toggle" />
        <ModalCreateUser />
      </div>

      <div className="w-full overflow-x-auto auto-rows-auto gap-5 md:px-4 lg:px-8 py-8">
        <div className="flex flex-col w-full gap-5 bg-gray-900 rounded-lg">
          <div className="px-5 py-5 overflow-x-auto">
            <UserManagement />
            <UserPagination />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default user
