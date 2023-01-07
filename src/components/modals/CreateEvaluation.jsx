import { AddEvaluation } from '../forms'

import { BsXLg } from 'react-icons/bs'

const CreateEvaluation = () => {
  return (
    <div className="modal w-full h-screen" style={{ margin: 0 }}>
      <div className="modal-box max-h-[70%] w-11/12 max-w-5xl bg-[#e9ecef] dark:bg-gray-900 transition-all ease-in-out duration-300">

        {/* Title */}
        <div className="flex flex-col w-full h-full">
          <label
            htmlFor="modal-create-evaluation"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <BsXLg />
          </label>
          <h4 className="font-semibold text-lg text-center text-black dark:text-white">
            Buat Evaluasi
          </h4>
        </div>

        {/* Form */}
        <div className="flex flex-col w-full overflow-y-auto pr-5">
          <AddEvaluation />
        </div>

      </div>
    </div>
  )
}

export default CreateEvaluation
