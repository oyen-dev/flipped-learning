import { useState } from 'react'

import { Image } from 'antd'
import Fault from '../../assets/images/fault.png'
import { BsCloudDownload } from 'react-icons/bs'

const ViewImage = (props) => {
  // Destructure props
  const { url, name } = props

  // Local states
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex flex-col space-y-2 w-full h-full">

      <div className="flex flex-row w-full items-center justify-between">
        <p className="w-1/2 mb-0 text-base break-words">{name}</p>
        <div className="w-1/2 flex flex-row space-x-2 items-center justify-end group">
          <BsCloudDownload className="w-5 h-5 fill-black dark:fill-white group-hover:fill-blue-500 transition-all duration-300 ease-in-out" />
          <a href={url} target='_blank' rel='noreferrer' download className="mb-0 text-base text-black dark:text-white group-hover:text-blue-500 transition-all duration-300 ease-in-out">Download</a>
        </div>
      </div>

      <div className="flex w-full h-full items-center justify-center">
        <Image
          src={url}
          alt={name}
          fallback={Fault}
          preview={{
            visible: isVisible,
            onVisibleChange: (visible, prevVisible) => setIsVisible(visible),
            onClose: () => setIsVisible(false)
          }}
        />
      </div>
    </div>
  )
}

export default ViewImage
