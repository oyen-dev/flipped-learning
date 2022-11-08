import { BsCameraVideo, BsFileImage, BsFilePdf, BsFileWord, BsFilePpt, BsFileEarmark } from 'react-icons/bs'

const Post = (props) => {
  const { description, attachments } = props
  return (
    <div className="flex flex-col space-y-5 w-full bg-transparent">
      <p className="mb-0">{description}</p>

      <div className="flex flex-col w-full space-y-2">
        {attachments.map((attachment) => <Attachment {...attachment} key={attachment._id} />)}
      </div>
    </div>
  )
}

const Attachment = (props) => {
  const { type, name, url } = props

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
      {indexofType <= 2 && <BsFileImage className="w-5 h-5 fill-black" />}
      {indexofType > 2 && indexofType <= 5 && <BsCameraVideo className="w-5 h-5 fill-black" />}
      {indexofType > 5 && indexofType <= 6 && <BsFilePdf className="w-5 h-5 fill-black" />}
      {indexofType > 6 && indexofType <= 8 && <BsFileWord className="w-5 h-5 fill-black" />}
      {indexofType > 8 && indexofType <= 10 && <BsFilePpt className="w-5 h-5 fill-black" />}
      {indexofType > 10 && <BsFileEarmark className="w-5 h-5 fill-black" />}
      <a href={url} target='_blank' rel='noreferrer' className="mb-0 text-black" download={name}>{name}</a>
    </div>
  )
}

export default Post
