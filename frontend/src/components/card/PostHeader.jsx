import momentId from '../../constants/momentId'

import { BsBook, BsClipboardCheck } from 'react-icons/bs'
import moment from 'moment'
moment.defineLocale('id', momentId)

const PostHeader = (props) => {
  const { teacherId, title, isTask, taskId, createdAt, updatedAt } = props
  const { picture } = teacherId
  const isUpdated = createdAt !== updatedAt

  return (
    <div className="flex flex-row space-x-4 justify-start items-center w-full">
      <img src={picture} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col space-y-1 w-full items-start justify-center">
        <div className="flex flex-row space-x-2 items-center justify-start">
          {isTask
            ? <BsClipboardCheck className='w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out'/>
            : <BsBook className='w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out'/>
          }
          <h5 className="mb-0 text-lg text-black dark:text-white duration-300 ease-in-out">{title}</h5>
        </div>
        <span className="mb-0 text-xs text-black dark:text-white duration-300 ease-in-out">
          {`${moment(createdAt).format('LLLL')}`}
        </span>
        {isTask && (
          <span className="mb-0 text-xs text-yellow-600 dark:text-yellow-300 duration-300 ease-in-out">
            {`Deadline: ${moment(taskId.deadline.end).format('LLLL')}`}
          </span>
        )}
        {isUpdated && (
          <span className="mb-0 text-xs text-blue-400">
            {`Diperbarui pada ${moment(updatedAt).format('LLLL')}`}
          </span>
        )}
      </div>
    </div>
  )
}

export default PostHeader
