import { useState } from 'react'

import { Image } from 'antd'
import Fault from '../../assets/images/fault.png'

const ViewImage = (props) => {
  // Destructure props
  const { url, name } = props

  // Local states
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex flex-col space-y-2 w-full h-full">
      <p className="mb-0 text-base">{name}</p>
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
