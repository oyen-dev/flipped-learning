import { Link } from 'react-router-dom'

const GradeSubmission = (props) => {
  // Props destructuring
  const { currentSubmissionData } = props
  const {
    answers,
    attachments,
    updatedAt,
    feedback,
    points,
    reaction,
    studentId,
    _id
  } = currentSubmissionData
  const { fullName, picture } = studentId

  return (
    <div className="flex flex-col w-full space-y-2">
      <Link
        to={`students/${_id}`}
        className="flex flex-row space-x-4 items-center"
      >
        {/* Full rounded picture */}
        <img
          className="w-12 h-12 rounded-full bg-gray-500 object-contain"
          src={picture}
        />
        {/* Student name */}
        <span className="text-sm lg:text-base font-semibold text-black dark:text-white hover:text-blue-500 hover:dark:text-blue-500 duration-150 ease-in-out">
          {fullName}
        </span>
      </Link>
    </div>
  )
}

export default GradeSubmission
