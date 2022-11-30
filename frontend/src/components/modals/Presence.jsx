import { useState, useEffect } from 'react'
import { useManagement } from '../../contexts/Management'

import { OpenPresence, EditPresence, RecordPresence } from '../forms'

import { BsXLg } from 'react-icons/bs'
import { Spin } from 'antd'

const Presence = () => {
  // Management States
  const { managementStates } = useManagement()
  const { presenceMode } = managementStates

  // Local States
  const [mode, setMode] = useState(null)

  // Update mode based on presenceMode
  const syncMode = () => {
    if (presenceMode === 'open') setMode(1)
    else if (presenceMode === 'edit') setMode(2)
    else if (presenceMode === 'presence') setMode(3)
    else setMode(undefined)
  }

  // Monitor presenceMode
  useEffect(() => {
    syncMode()
  }, [presenceMode])

  return (
    <div className="modal" style={{ margin: 0 }}>
      <div className="modal-box flex flex-col relative bg-[#e9ecef] dark:bg-gray-900 transition-all ease-in-out duration-300">

        {/* Title */}
        <div className="flex flex-col w-full h-full">
          <label
            htmlFor="modal-presence"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <BsXLg />
          </label>
          <h4 className="font-semibold text-lg text-center text-black dark:text-white">
            {presenceMode === 'open'
              ? 'Buka Presensi'
              : presenceMode === 'edit'
                ? 'Edit Presensi'
                : 'Presensi Sekarang'
            }
          </h4>
        </div>

        {/* Form */}
        <div className="flex flex-col w-full overflow-y-auto pr-5">
          {mode === null
            ? <Spin size='default'/>
            : mode === 1
              ? <OpenPresence />
              : mode === 2
                ? <EditPresence />
                : mode === 3
                  ? <RecordPresence />
                  : 'Error'
          }
        </div>
      </div>
    </div>
  )
}

export default Presence
