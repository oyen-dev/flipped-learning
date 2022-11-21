import { BsEmojiFrown } from 'react-icons/bs'

const NoSubmission = (props) => {
  // Destructure props
  const { message } = props

  return (
    <div className="text-black flex flex-col w-full items-center justify-center transition-all ease-in-out duration-300">
      <BsEmojiFrown className="text-5xl" />
      <p className="mb-0 pt-3">{message}</p>
    </div>
  )
}

export default NoSubmission
