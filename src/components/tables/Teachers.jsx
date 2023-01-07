import { useManagement } from '../../contexts/Management'
import { useGlobal } from '../../contexts/Global'
import api from '../../api'

import {
  BsEye,
  BsPencilSquare,
  BsTrash,
  BsBootstrapReboot
} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import moment from 'moment/moment'

const Teachers = (props) => {
  const { teachers } = props

  // Management States
  const { managementStates } = useManagement()
  const { setIsFetchTeacher } = managementStates

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  const dialogDeleteTeacher = async (id) => {
    // mySwal confirm deletion
    mySwal
      .fire({
        title: 'Apakah anda yakin?',
        text: 'Penghapusan permanen dilakukan 90 hari setelah penghapusan data ini.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteTeacher(id)
        }
      })
  }

  const dialogRestoreTeacher = async (id) => {
    // mySwal confirm deletion
    mySwal
      .fire({
        title: 'Data Guru ingin Dikembalikan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, kembalikan!',
        cancelButtonText: 'Batal'
      })
      .then((result) => {
        if (result.isConfirmed) {
          restoreTeacher(id)
        }
      })
  }

  // Delete teacher
  const deleteTeacher = async (id) => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    await api
      .delete(`/users/teachers/${id}`, config)
      .then((res) => {
        // console.log(res)
        mySwal
          .fire({
            icon: 'success',
            title: 'Success',
            text: 'Data guru berhasil dihapus',
            showConfirmButton: false,
            timer: 2000
          })
          .then(() => setIsFetchTeacher(true))
      })
      .catch((err) => {
        console.log(err)
        mySwal
          .fire({
            icon: 'error',
            title: 'Error',
            text: 'Data guru gagal dihapus',
            showConfirmButton: false,
            timer: 2000
          })
          .then(() => setIsFetchTeacher(true))
      })
  }

  // Restore teacher
  const restoreTeacher = async (id) => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    await api
      .post(`/users/teachers/${id}`, {}, config)
      .then((res) => {
        // console.log(res)
        mySwal
          .fire({
            icon: 'success',
            title: 'Success',
            text: 'Data guru berhasil dikembalikan',
            showConfirmButton: false,
            timer: 3000
          })
          .then(() => setIsFetchTeacher(true))
      })
      .catch((err) => {
        console.log(err)
        mySwal
          .fire({
            icon: 'error',
            title: 'Error',
            text: 'Data guru gagal dikembalikan',
            showConfirmButton: false,
            timer: 3000
          })
          .then(() => setIsFetchTeacher(true))
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
              {teachers[0].isDeleted && (
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
            {teachers.map((teacher, index) => (
              <TableRow
                teacher={teacher}
                key={index}
                index={index}
                dialogDeleteTeacher={dialogDeleteTeacher}
                dialogRestoreTeacher={dialogRestoreTeacher}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = (props) => {
  const { teacher, index, dialogDeleteTeacher, dialogRestoreTeacher } = props
  const { name, email, key, isDeleted, willBeDeletedAt } = teacher

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
            onClick={() => navigate(`/management/teachers/${key}`)}
          >
            <BsEye className="fill-white" />
          </button>

          <button
            disabled={isDeleted}
            className="btn bg-emerald-600 border-none"
            onClick={() => navigate(`/management/teachers/${key}/edit`)}
          >
            <BsPencilSquare className="fill-white" />
          </button>

          <button
            disabled={isDeleted}
            className="btn bg-red-600 border-none"
            onClick={() => dialogDeleteTeacher(key)}
          >
            <BsTrash className="fill-white" />
          </button>

          {isDeleted && (
            <button
              disabled={!isDeleted}
              className="btn bg-sky-600 border-none"
              onClick={() => dialogRestoreTeacher(key)}
            >
              <BsBootstrapReboot className="fill-white" />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

export default Teachers
