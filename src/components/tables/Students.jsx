import { useManagement } from '../../contexts/Management'
import { useGlobal } from '../../contexts/Global'
import api from '../../api'

import { BsEye, BsPencilSquare, BsTrash, BsBootstrapReboot } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import moment from 'moment/moment'

const Students = (props) => {
  const { students } = props

  // Management States
  const { managementStates } = useManagement()
  const { setIsFetchStudent } = managementStates

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  const dialogDeleteStudent = async (id) => {
    // mySwal confirm deletion
    mySwal.fire({
      title: 'Apakah anda yakin?',
      text: 'Penghapusan permanen dilakukan 90 hari setelah penghapusan data ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id)
      }
    })
  }

  const dialogRestoreStudent = async (id) => {
    // mySwal confirm deletion
    mySwal
      .fire({
        title: 'Data Siswa ingin Dikembalikan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, kembalikan!',
        cancelButtonText: 'Batal'
      })
      .then((result) => {
        if (result.isConfirmed) {
          restoreStudent(id)
        }
      })
  }

  // Delete student
  const deleteStudent = async (id) => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    await api.delete(`/users/students/${id}`, config)
      .then(res => {
        console.log(res)
        mySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data siswa berhasil dihapus',
          showConfirmButton: false,
          timer: 2000
        }).then(() => setIsFetchStudent(true))
      }).catch(err => {
        console.log(err)
        mySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Data siswa gagal dihapus',
          showConfirmButton: false,
          timer: 2000
        }).then(() => setIsFetchStudent(true))
      })
  }

  // Restore teacher
  const restoreStudent = async (id) => {
    // Configuration
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    console.log(config)

    await api
      .post(`/users/students/${id}`, {}, config)
      .then((res) => {
        // console.log(res)
        mySwal
          .fire({
            icon: 'success',
            title: 'Success',
            text: 'Data siswa berhasil dikembalikan',
            showConfirmButton: false,
            timer: 3000
          })
          .then(() => setIsFetchStudent(true))
      })
      .catch((err) => {
        console.log(err)
        mySwal
          .fire({
            icon: 'error',
            title: 'Error',
            text: 'Data siswa gagal dikembalikan',
            showConfirmButton: false,
            timer: 3000
          })
          .then(() => setIsFetchStudent(true))
      })
  }

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
              {students[0].isDeleted && (
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Akan Dihapus Pada
                </th>
              )}
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student, index) => (
              <TableRow
                student={student}
                key={index}
                index={index}
                dialogDeleteStudent={dialogDeleteStudent}
                dialogRestoreStudent={dialogRestoreStudent}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = (props) => {
  const { student, index, dialogDeleteStudent, dialogRestoreStudent } = props
  const { name, email, key, isDeleted, willBeDeletedAt } = student

  // Navigator
  const navigate = useNavigate()

  return (
    <tr>
      <td className="py-3 px-5 text-left overflow-clip">
        <div className="flex items-center justify-start">
          <span className="font-medium whitespace-nowrap">{index + 1}</span>
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
          <span className="font-medium whitespace-nowrap">{email}</span>
        </div>
      </td>

      {isDeleted && (
        <td className="py-3 px-5 text-left overflow-clip">
          <div className="flex items-center justify-start">
            <span className="font-medium text-left whitespace-nowrap">
              {moment(willBeDeletedAt).format('DD MMMM YYYY')}
            </span>
          </div>
        </td>
      )}

      <td className="py-3 px-5 text-left overflow-clip">
      <div className="flex flex-row space-x-4 items-center justify-center">
          <button
            disabled={isDeleted}
            className="btn bg-sky-600 border-none"
            onClick={() => navigate(`/management/students/${key}`)}
          >
            <BsEye className="fill-white" />
          </button>

          <button
            disabled={isDeleted}
            className="btn bg-emerald-600 border-none"
            onClick={() => navigate(`/management/students/${key}/edit`)}
          >
            <BsPencilSquare className="fill-white" />
          </button>

          <button
            disabled={isDeleted}
            className="btn bg-red-600 border-none"
            onClick={() => dialogDeleteStudent(key)}
          >
            <BsTrash className="fill-white" />
          </button>

          {isDeleted && (
            <button
              disabled={!isDeleted}
              className="btn bg-sky-600 border-none"
              onClick={() => dialogRestoreStudent(key)}
            >
              <BsBootstrapReboot className="fill-white" />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

export default Students
