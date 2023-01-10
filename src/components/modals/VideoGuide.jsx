import { useGlobal } from '../../contexts/Global'

import { BsXLg } from 'react-icons/bs'
import ReactPlayer from 'react-player'

const VideoGuide = () => {
  const VIDEO_URL = `${import.meta.env.VITE_GUIDE_VIDEO_URL}`

  // Global States
  const { globalState } = useGlobal()
  const { play, setPlay } = globalState

  return (
    <div className="modal w-full">
      <div className="modal-box w-11/12 max-w-5xl relative bg-gray-800">
        <label
          htmlFor="modal-video-guide"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={() => setPlay(false)}
        >
          <BsXLg />
        </label>

        <div className="flex flex-col w-full h-full text-white">
          <div className="flex flex-col w-full bg-gray-700 px-5 py-5 rounded-lg gap-5">
            <ReactPlayer
              url={VIDEO_URL}
              controls
              width="100%"
              height="100%"
              playing={play}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGuide
