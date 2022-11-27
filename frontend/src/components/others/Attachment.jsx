import { Link } from 'react-router-dom'
import { BsCameraVideo, BsFileImage, BsFilePdf, BsFileWord, BsFilePpt, BsFileEarmark } from 'react-icons/bs'

const Attachment = (props) => {
  const { _id, type, name, isTeacher } = props

  const listOfAcceptFiles = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'video/mp4',
    'video/quicktime',
    'video/webm',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
  const indexofType = listOfAcceptFiles.indexOf(type)

  return (
    <div className="flex flex-row space-x-2 items-center">
      {indexofType <= 2 && <BsFileImage className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black'}`} />}
      {indexofType > 2 && indexofType <= 5 && <BsCameraVideo className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black'}`} />}
      {indexofType > 5 && indexofType <= 6 && <BsFilePdf className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black'}`} />}
      {indexofType > 6 && indexofType <= 8 && <BsFileWord className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black'}`} />}
      {indexofType > 8 && indexofType <= 10 && <BsFilePpt className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black'}`} />}
      {indexofType > 10 && <BsFileEarmark className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black'}`} />}
      <Link to={`attachments/${_id}`} className={isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black'}>{name}</Link>
    </div>
  )
}

export default Attachment
