import { Link } from 'react-router-dom'
import { BsCameraVideo, BsFileImage, BsFilePdf, BsFileWord, BsFilePpt, BsFileEarmark } from 'react-icons/bs'

const Attachment = (props) => {
  const { _id, type, name, isTeacher, showAttachment } = props

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
    <div className="flex flex-row space-x-2 items-center group">
      {indexofType <= 2 && <BsFileImage className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out' : 'text-black group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out'}`} />}
      {indexofType > 2 && indexofType <= 5 && <BsCameraVideo className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out'}`} />}
      {indexofType > 5 && indexofType <= 6 && <BsFilePdf className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-blac group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-outk'}`} />}
      {indexofType > 6 && indexofType <= 8 && <BsFileWord className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out'}`} />}
      {indexofType > 8 && indexofType <= 10 && <BsFilePpt className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out'}`} />}
      {indexofType > 10 && <BsFileEarmark className={`w-5 h-5 ${isTeacher ? 'text-black dark:text-white duration-300 ease-in-out' : 'text-black group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out'}`} />}
      {!isTeacher
        ? <Link to={`attachments/${_id}`} className={isTeacher ? 'text-black dark:text-white group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out' : 'text-black group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out'}>{name}</Link>
        : <button
            onClick={() => showAttachment(_id)}
            className={isTeacher ? 'text-black dark:text-white group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out' : 'text-black group-hover:text-blue-500 group-hover:dark:text-blue-500 duration-300 ease-in-out'}>{name}</button>
      }
    </div>
  )
}

export default Attachment
