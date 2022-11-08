import { useGlobal } from '../../contexts/Global'
import { useAuth } from '../../contexts/Auth'

import { Link } from 'react-router-dom'
import { BsCameraVideo, BsFileImage, BsFilePdf, BsFileWord, BsFilePpt, BsFileEarmark, BsPencilSquare, BsTrash } from 'react-icons/bs'

const Post = (props) => {
  const { description, attachments, postId } = props

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  // Handle delete dialog
  const deletePostDialog = () => {
    mySwal.fire({
      title: 'Apakah anda ingin menghapus post ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('delete')
      }
    })
  }

  return (
    <div className="flex flex-col space-y-5 w-full bg-transparent">
      <p className="mb-0">{description}</p>

      <div className="flex flex-col w-full space-y-2">
        {attachments.map((attachment) => <Attachment {...attachment} key={attachment._id} />)}
      </div>

      {user.role === 'TEACHER' && (
        <div className="flex flex-row space-x-4 w-full items-center justify-end">
          <Link to={`posts/${postId}/edit`} className='flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-lg duration-300 ease-in-out'>
            <BsPencilSquare className="w-5 h-5 fill-white" />
            <span>Edit Postingan</span>
          </Link>

          <button
            onClick={deletePostDialog}
            className='flex flex-row space-x-2 items-center justify-center py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg duration-300 ease-in-out'>
            <BsTrash className="w-5 h-5 fill-white" />
            <span>Hapus Postingan</span>
          </button>
        </div>
      )}
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
