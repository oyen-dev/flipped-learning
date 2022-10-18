import Actions from './Actions'

const Student = (props) => {
  const { students } = props

  return (
    <div className="w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="flex text-left py-3 px-4 uppercase font-semibold text-sm">
                No
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Email
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student, index) => (
                <TableRow key={index} student={student} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = (props) => {
  const { student, index } = props
  const { name, email, _id } = student
  return (
    <tr className="hover:bg-gray-300 transition-all ease-in-out duration-300" key={_id}>
      <td className="text-left py-3 px-4">{index}</td>
      <td className="text-left py-3 px-4">{name}</td>
      <td className="text-left py-3 px-4">{email}</td>
      <td className="text-left py-3 px-4">
        <Actions />
      </td>
    </tr>
  )
}

export default Student
