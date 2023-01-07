import { AddStudent, AddTeacher } from '../forms'

import { BsXLg } from 'react-icons/bs'

const CreateUser = (props) => {
  const { mode } = props
  return (
    <div className="modal" style={{ margin: 0 }}>
      <div className="modal-box flex flex-col relative bg-[#e9ecef] dark:bg-gray-900 transition-all ease-in-out duration-300">

        {/* Title */}
        <div className="flex flex-col w-full h-full">
          <label
            htmlFor="my-modal-create"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <BsXLg />
          </label>
          <h4 className="font-semibold text-lg text-center text-black dark:text-white">
            {mode === 'teacher' ? 'Tambah Data Guru' : 'Tambah Data Siswa'}
          </h4>
        </div>

        {/* Form */}
        <div className="flex flex-col w-full overflow-y-auto pr-5">
          {mode === 'teacher' ? <AddTeacher /> : <AddStudent />}
        </div>
      </div>
    </div>
  )
}

export default CreateUser
