import momentId from '../../constants/momentId'

import moment from 'moment'
moment.defineLocale('id', momentId)

const PostHeader = (props) => {
  const { picture, title, createdAt, isUpdated, updatedAt } = props
  return (
    <div className="flex flex-row space-x-4 justify-start items-center w-full">
      <img src={picture} className="w-10 h-10 rounded-full" />
      <div className="flex flex-col w-full items-start justify-center">
        <h5 className="mb-0 text-black dark:text-white ">{title}</h5>
        <span className="mb-0 text-black dark:text-white ">
          {`${moment(createdAt).format('LLLL')}`}
        </span>
        {isUpdated && (
          <span className="mb-0 text-blue-400">
            {`Diperbarui pada ${moment(updatedAt).format('LLLL')}`}
          </span>
        )}
      </div>
    </div>
  )
}

export default PostHeader
