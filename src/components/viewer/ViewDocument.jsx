import { BsCloudDownload } from 'react-icons/bs'

const ViewDocument = (props) => {
  // Destructure props
  const { url, name } = props

  return (
    <div className="flex flex-col space-y-2 w-full h-full">

      <div className="flex flex-row w-full items-center justify-between">
        <p className="w-1/2 mb-0 text-base break-words">{name}</p>
        <div className="w-1/2 flex flex-row space-x-2 items-center justify-end group">
          <BsCloudDownload className="w-5 h-5 fill-black dark:fill-white group-hover:fill-blue-500 transition-all duration-300 ease-in-out" />
          <a href={url} target='_blank' rel='noreferrer' download className="mb-0 text-base text-black dark:text-white group-hover:text-blue-500 transition-all duration-300 ease-in-out">Download</a>
        </div>
      </div>

      <div className="flex w-full h-full items-center justify-center">
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
          frameBorder="0"
          className="flex w-full min-h-[750px] h-full"
        >
          This is an embedded{' '}
          <a target="_blank" href="http://office.com" rel="noreferrer">
            Microsoft Office
          </a>{' '}
          document, powered by{' '}
          <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
            Office Online
          </a>
          .
        </iframe>
      </div>
    </div>
  )
}

export default ViewDocument
