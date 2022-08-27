const RecentAccess = () => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 text-center">Tanggal</th>
          <th className="py-3 text-center">Jam</th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light">
        <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
          <td className="py-3 text-left whitespace-nowrap">
            <div className="flex items-center justify-center">
              <span className="font-medium">Senin, 1 Januari 2022</span>
            </div>
          </td>
          <td className="py-3  text-left">
            <div className="flex items-center justify-center">
              <span className="font-medium">08 : 30 AM</span>
            </div>
          </td>
        </tr>

        <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
          <td className="py-3  text-left whitespace-nowrap">
            <div className="flex items-center justify-center">
              <span className="font-medium">Selasa, 2 Januari 2022</span>
            </div>
          </td>
          <td className="py-3  text-left">
            <div className="flex items-center justify-center">
              <span className="font-medium">08 : 35 AM</span>
            </div>
          </td>
        </tr>

        <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
          <td className="py-3  text-left whitespace-nowrap">
            <div className="flex items-center justify-center">
              <span className="font-medium">Rabu, 3 Januari 2022</span>
            </div>
          </td>
          <td className="py-3  text-left">
            <div className="flex items-center justify-center">
              <span className="font-medium">08 : 26 AM</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default RecentAccess
