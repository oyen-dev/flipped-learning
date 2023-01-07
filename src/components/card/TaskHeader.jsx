import momentId from '../../constants/momentId'

import { BsClipboardCheck } from 'react-icons/bs'

import moment from 'moment/moment'

moment.updateLocale('id', momentId)

const TaskHeader = (props) => {
  const { post } = props
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row space-x-2 font-bold items-center justify-start">
        <BsClipboardCheck className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
        <p className="mb-0 text-lg">{post.title}</p>
      </div>

      <div className="flex">
        <p className="mb-0 text-sm text-yellow-700 dark:text-yellow-400 duration-300 ease-in-out">
          Deadline: {moment(post.taskId.deadline.end).format('LLLL')}
        </p>
      </div>
    </div>
  )
}

export default TaskHeader
