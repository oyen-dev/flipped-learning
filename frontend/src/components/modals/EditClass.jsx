import { EditClass as EditClassForm } from '../forms'

import { BsXLg } from 'react-icons/bs'

const EditClass = () => {
  return (
    <div className="modal w-full h-screen" style={{ margin: 0 }}>
      <div className="modal-box max-h-[70%] w-11/12 max-w-5xl bg-gray-900">
        <div className="flex w-full justify-center items-center h-10 sticky top-0 left-0 z-40">
          <label
            htmlFor="modal-update-class"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <BsXLg />
          </label>
          <h5 className="font-semibold text-lg text-center mb-0 text-white">
            Edit Kelas
          </h5>
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex flex-col lg:flex-row w-full text-white items-start justify-start py-5 space-y-4 lg:space-y-0 overflow-auto">
            <EditClassForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditClass
