import UserAction from './UserAction'

const UserManagementGuru = () => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-black text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 text-center whitespace-nowrap">No</th>
          <th className="py-3 px-5 text-start whitespace-nowrap">
            Nama Lengkap
          </th>
          <th className="py-3 px-5 text-start whitespace-nowrap">
            Nomor Telepon
          </th>
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
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">Budi Santoso</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">085734568876</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">budisan@gmail.com</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">Guru</span>
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
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">Andi Santoso</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">085734568890</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">andisan@gmail.com</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">Guru</span>
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
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">Siti Rahma Nuralifa</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">085734566672</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">siti77rahma@gmail.com</span>
            </div>
          </td>
          <td className="py-3 px-5 text-left">
            <div className="flex items-center justify-start">
              <span className="font-medium">Guru</span>
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

export default UserManagementGuru
