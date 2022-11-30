import momentId from '../../constants/momentId'

import moment from 'moment/moment'

moment.updateLocale('id', momentId)

const PresenceHeader = (props) => {
  // Destructure props
  const { time } = props
  return (
    <div className="flex w-full">
      <p className="mb-0 text-black dark:text-white duration-300 ease-in-out">
        {moment(time).format('dddd, DD MMMM YYYY')}
      </p>
    </div>
  )
}

export default PresenceHeader
