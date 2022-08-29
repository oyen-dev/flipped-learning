import UserAction from './UserAction'

const UserManagementSiswa = () => {
  return (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-black text-white uppercase text-sm leading-normal">
              <th className="py-3 px-5 text-center whitespace-nowrap">No</th>
              <th className="py-3 px-5 text-start whitespace-nowrap">Nama Lengkap</th>
              <th className="py-3 px-5 text-start whitespace-nowrap">Nomor Telepon</th>
              <th className="py-3 px-5 text-start whitespace-nowrap">Email</th>
              <th className="py-3 px-5 text-start whitespace-nowrap">Role</th>
              <th className="py-3 px-5 text-center whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-white text-xs font-light">
            <tr className="bg-gray-700 hover:bg-gray-500">
              <td className="py-3 px-5 text-left whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <span className="font-medium">1</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">Reza Bagus </span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">087834563321</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">Rezaba@gmail.com</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">Siswa</span>
                </div>
              </td>
              <td className="py-3 px-5 text-left">
                <div className="flex justify-center">
                  <UserAction />
                </div>
              </td>
            </tr>

            <tr className="bg-gray-700 hover:bg-gray-500">
              <td className="py-3 px-5 text-left whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <span className="font-medium">2</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">Adinda Rahma </span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">087834563328</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">adinda332@gmail.com</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">Siswa</span>
                </div>
              </td>
              <td className="py-3 px-5 text-left">
                <div className="flex justify-center">
                  <UserAction />
                </div>
              </td>
            </tr>

            <tr className="bg-gray-700 hover:bg-gray-500">
              <td className="py-3 px-5 text-left whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <span className="font-medium">3</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">Bagus Putra Djatmiko</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">087834533328</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">DjaBagus@gmail.com</span>
                </div>
              </td>
              <td className="py-3 px-5  text-left">
                <div className="flex items-center justify-start">
                  <span className="font-medium">Siswa</span>
                </div>
              </td>
              <td className="py-3 px-5 text-left">
                <div className="flex justify-center">
                  <UserAction />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  )
}

export default UserManagementSiswa
