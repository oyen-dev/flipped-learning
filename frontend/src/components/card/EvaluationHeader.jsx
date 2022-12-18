import momentId from '../../constants/momentId'

import { BsClipboardCheck } from 'react-icons/bs'
import moment from 'moment'
moment.updateLocale('id', momentId)

const EvaluationHeader = (props) => {
  const { teacherId, deadline, title } = props
  const { picture } = teacherId
  const { start, end } = deadline

  return (
    <div className="flex flex-row space-x-4 justify-start items-center w-full">
      <img src={picture} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col space-y-1 w-full items-start justify-center">
        <div className="flex flex-row space-x-2 items-center justify-start">
          <BsClipboardCheck className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
          <h5 className="mb-0 text-lg text-black dark:text-white duration-300 ease-in-out">
            {title}
          </h5>
        </div>
        <span className="mb-0 text-xs text-black dark:text-white duration-300 ease-in-out">
          {`${moment(start).format('LLLL')}`}
        </span>

        <span className="mb-0 text-xs text-yellow-600 dark:text-yellow-300 duration-300 ease-in-out">
          {`Deadline: ${moment(end).format('LLLL')}`}
        </span>
      </div>
    </div>
  )
}

export default EvaluationHeader
