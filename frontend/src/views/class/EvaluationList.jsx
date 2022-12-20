import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'
import { EvaluationHeader } from '../../components/card'

import { Collapse } from 'antd'
import {
  BsChevronRight,
  BsChevronDown,
  BsPencilSquare,
  BsTrash,
  BsEye,
  BsFileText
} from 'react-icons/bs'
import { Link, useLocation, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

const { Panel } = Collapse

const EvaluationList = (props) => {
  // Destructure props
  const { evaluations, setFetchEvaluations } = props

  // useLocation
  const { pathname } = useLocation()

  // useParams
  const { id: classId } = useParams()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Delete Evaluation
  const deleteEvaluation = async (id) => {
    // Show loading
    mySwal.fire({
      title: 'Menghapus evaluasi...',
      allowEscapeKey: true,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      await api.delete(`/class/${classId}/evaluations/${id}`, config)

      // Show success
      mySwal.fire({
        icon: 'success',
        title: 'Evaluasi berhasil dihapus!',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => setFetchEvaluations(true))
    } catch (error) {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
        timer: 2000,
        showConfirmButton: false
      })
    }
  }

  // Dialog delete evaluation
  const dialogDeleteEvaluation = (id) => {
    mySwal.fire({
      icon: 'warning',
      title: 'Apakah Anda yakin?',
      text: 'Evaluasi yang dihapus tidak dapat dikembalikan!',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Batal',
      cancelButtonColor: '#3085d6',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEvaluation(id)
      }
    })
  }

  return (
    <Collapse
      className="flex flex-col w-full space-y-10 site-collapse-custom-collapse"
      expandIconPosition="end"
      expandIcon={({ isActive }) =>
        isActive
          ? (
          <BsChevronDown className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
            )
          : (
          <BsChevronRight className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
            )
      }
      // expandIcon={({ isActive }) => <RightOutlined className='text-white fill-white' rotate={isActive ? 90 : 0} />}
      style={{ backgroundColor: 'transparent', border: 'none' }}
    >
      {evaluations.map((evaluation, index) => (
        <Panel
          header={<EvaluationHeader {...evaluation} />}
          key={index}
          className="flex flex-col w-full text-black dark:text-white bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300"
        >
          {user && user.role === 'STUDENT' && (
            <div className="flex flex-row space-x-4 w-full items-center justify-end">
              <Link
                to={`${pathname}/evaluations/${evaluation._id}`}
                className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out"
              >
                <BsFileText className="w-5 h-5 fill-white" />
                <span>Kerjakan Evaluasi</span>
              </Link>
            </div>
          )}

          {user && user.role === 'TEACHER' && (
            <div className="flex flex-row space-x-4 w-full items-center justify-end">
              <Link
                to={`${pathname}/evaluations/${evaluation._id}`}
                className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-green-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out"
              >
                <BsEye className="w-5 h-5 fill-white" />
                <span>Lihat Hasil</span>
              </Link>
              <Link
                to={`${pathname}/evaluations/${evaluation._id}/edit`}
                className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:text-white hover:bg-blue-800 rounded-lg duration-300 ease-in-out"
              >
                <BsPencilSquare className="w-5 h-5 fill-white" />
                <span>Edit Evaluasi</span>
              </Link>

              <button onClick={() => dialogDeleteEvaluation(evaluation._id)} className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg duration-300 ease-in-out">
                <BsTrash className="w-5 h-5 fill-white" />
                <span>Hapus Evaluasi</span>
              </button>
            </div>
          )}
        </Panel>
      ))}
    </Collapse>
  )
}

export default EvaluationList
