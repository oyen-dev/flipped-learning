import { BsCameraVideo, BsFileImage, BsFilePdf } from 'react-icons/bs'

const Post = (props) => {
  const { description } = props
  return (
    <div className="flex flex-col space-y-5 w-full bg-transparent">
      <p className="mb-0">{description}</p>

      <div className="flex flex-col w-full space-y-2">
        <div className="flex flex-row space-x-2 items-center">
            <BsCameraVideo className='w-5 h-5 fill-black'/>
            <span className="mb-0 text-black ">Video 1.mp4</span>
        </div>

        <div className="flex flex-row space-x-2 items-center">
            <BsFileImage className='w-5 h-5 fill-black'/>
            <span className="mb-0 text-black">Gambar 1.mp4</span>
        </div>

        <div className="flex flex-row space-x-2 items-center">
            <BsFilePdf className='w-5 h-5 fill-black'/>
            <span className="mb-0 text-black ">Pdf 1.mp4</span>
        </div>
      </div>
    </div>
  )
}

export default Post
