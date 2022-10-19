import { useNavigate } from 'react-router-dom'

const Student = (props) => {
  const { students } = props

  return (
    <div className="flex flex-col w-full items-start justify-start overflow-x-auto">
      <div className="shadow w-full rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="flex text-left py-3 px-4 uppercase font-semibold text-sm">
                No
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Nama
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Email
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student, index) => (
              <TableRow student={student} key={index} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = (props) => {
  const { student, index } = props
  const { name, email, key } = student

  // Navigator
  const navigate = useNavigate()

  return (
    <tr>
      <td className="py-3 px-5 text-left overflow-clip">
        <div className="flex items-center justify-start">
          <span className="font-medium whitespace-nowrap">
            {index + 1}
          </span>
        </div>
      </td>

      <td className="py-3 px-5 text-left overflow-clip">
        <div className="flex items-center justify-start">
          <span className="font-medium text-left whitespace-nowrap">
            {name}
          </span>
        </div>
      </td>

      <td className="py-3 px-5 text-left overflow-clip">
        <div className="flex items-center justify-start">
          <span className="font-medium whitespace-nowrap">
            {email}
          </span>
        </div>
      </td>

      <td className="py-3 px-5 text-left overflow-clip">
        <div className="flex flex-row space-x-4 items-center justify-center">
        <button className='btn bg-sky-600 border-none' onClick={() => navigate(`/management/students/${key}`)}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-eye fill-white"
        viewBox="0 0 16 16"
      >
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
      </svg>
    </button>

    <button className='btn bg-emerald-600 border-none' onClick={() => navigate(`/management/students/${key}`)}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pencil-square fill-white"
        viewBox="0 0 16 16"
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fillRule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>
    </button>

    <button className='btn bg-red-600 border-none' onClick={() => navigate(`/management/students/${key}`)}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash-fill fill-white"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
      </svg>
    </button>
        </div>
      </td>
    </tr>
  )
}

export default Student
