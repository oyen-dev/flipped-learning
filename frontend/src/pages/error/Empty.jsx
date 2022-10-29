import { BsEmojiFrown } from 'react-icons/bs'

const Empty = (props) => {
  // Destructure props
  const { message } = props

  return (
    <div className="flex flex-col w-full items-center justify-center py-5">
      <BsEmojiFrown className="text-5xl text-gray-400" />
      <p className="text-gray-500 pt-3">{message}</p>
    </div>
  )
}

export default Empty
