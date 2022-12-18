import { useAuth } from '../../contexts/Auth'

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
import { Link, useLocation } from 'react-router-dom'

const { Panel } = Collapse

const EvaluationList = (props) => {
  // Destructure props
  const { evaluations } = props

  // useLocation
  const { pathname } = useLocation()

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

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
                to={0}
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
                to={0}
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

              <button className="flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg duration-300 ease-in-out">
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
