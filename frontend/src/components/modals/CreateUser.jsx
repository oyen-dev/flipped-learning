import { AddStudent, AddTeacher } from '../forms'

const CreateUser = (props) => {
  const { mode } = props
  return (
    <div className="modal">
      <div className="modal-box relative bg-gray-800">
        <label
          htmlFor="my-modal-create"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </label>
        <h4 className="font-semibold text-lg text-center text-white">
          {mode === 'teacher' ? 'Tambah Data Guru' : 'Tambah Data Siswa'}
        </h4>

        {mode === 'teacher' ? <AddTeacher /> : <AddStudent />}
      </div>
    </div>
  )
}

export default CreateUser
