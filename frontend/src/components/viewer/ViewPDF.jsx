import { Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

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
      <p className='mb-0 text-base'>{name}</p>
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
