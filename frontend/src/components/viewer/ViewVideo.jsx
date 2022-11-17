import ReactPlayer from 'react-player'

const ViewVideo = (props) => {
  // Destructure props
  const { url, name } = props

  return (
    <div className="flex flex-col space-y-2 w-full h-full">
      <p className='mb-0 text-base'>{name}</p>
      <div className="flex w-full h-full">
        <ReactPlayer
          url={url}
          controls
          width='100%'
          height='100%'
        />
      </div>
    </div>
  )
}

export default ViewVideo
