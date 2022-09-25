const ActiveClass = () => {
  const data = [
    {
      key: '1',
      nomor: 1,
      nama: 'Teknik Pengolahan Audio Video',
      kelas: 'XI IPA',
      guru: 'Budi Tono, S.Pd., M.Pd.',
      jumlah: 34
    },
    {
      key: '2',
      nomor: 2,
      nama: 'Pengolahan Makan',
      kelas: 'X - APHP',
      guru: 'Budi Tono, S.Pd., M.Pd.',
      jumlah: 28
    }
  ]
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 px-5 text-center overflow-clip whitespace-nowrap">
            No.
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            Nama
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            Kelas
          </th>
          <th className="py-3 px-5 text-left overflow-clip whitespace-nowrap">
            Guru
          </th>
          <th className="py-3 px-5 text-cent overflow-cliper whitespace-nowrap">
            Jumlah Siswa
          </th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light ">
        {data.map((item) => {
          return (
            <tr
              className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300"
              key={item.key}
            >
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-center">
                  <span className="font-medium whitespace-nowrap">
                    {item.nomor}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap">
                    {item.nama}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap">
                    {item.kelas}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-start">
                  <span className="font-medium whitespace-nowrap">
                    {item.guru}
                  </span>
                </div>
              </td>
              <td className="py-3 px-5 text-left overflow-clip">
                <div className="flex items-center justify-center">
                  <span className="font-medium whitespace-nowrap">
                    {item.jumlah}
                  </span>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ActiveClass
