import { BsEmojiFrown } from 'react-icons/bs'

const Empty = (props) => {
  // Destructure props
  const { message } = props

  return (
    <div className="text-black dark:text-white flex flex-col w-full items-center justify-center py-5 transition-all ease-in-out duration-300">
      <BsEmojiFrown className="text-5xl" />
      <p className="pt-3">{message}</p>
    </div>
  )
}

export default Empty
