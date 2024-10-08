import { Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { BsCloudDownload } from 'react-icons/bs'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const ViewPDF = (props) => {
  // Destructure props
  const { url, name } = props

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <div className="flex flex-col space-y-2 w-full h-full">

      <div className="flex flex-row w-full items-center justify-between">
        <p className="w-1/2 mb-0 text-base break-words">{name}</p>
        <div className="w-1/2 flex flex-row space-x-2 items-center justify-end group">
          <BsCloudDownload className="w-5 h-5 fill-black dark:fill-white group-hover:fill-blue-500 transition-all duration-300 ease-in-out" />
          <a href={url} target='_blank' rel='noreferrer' download className="mb-0 text-base text-black dark:text-white group-hover:text-blue-500 transition-all duration-300 ease-in-out">Download</a>
        </div>
      </div>

      <div className="flex w-full h-full">
          <Viewer
            fileUrl={url}
            plugins={[defaultLayoutPluginInstance]}
          />
      </div>
    </div>
  )
}

export default ViewPDF
