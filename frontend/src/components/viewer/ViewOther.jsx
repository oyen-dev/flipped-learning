import { BsCloudDownload } from 'react-icons/bs'

const ViewOther = (props) => {
  // Destructure props
  const { url, name } = props

  return (
    <div className="flex flex-row w-full items-center justify-between">
      <p className="w-1/2 mb-0 text-base break-words">{name}</p>
      <div className="w-1/2 flex flex-row space-x-2 items-center justify-end group">
        <BsCloudDownload className="w-5 h-5 fill-black dark:fill-white group-hover:fill-blue-500 transition-all duration-300 ease-in-out" />
        <a href={url} target='_blank' rel='noreferrer' download className="mb-0 text-base text-black dark:text-white group-hover:text-blue-500 transition-all duration-300 ease-in-out">Download</a>
      </div>
    </div>
  )
}

export default ViewOther
