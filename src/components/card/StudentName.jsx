const StudentName = (props) => {
  // Props destructuring
  const { student } = props
  const { fullName, picture } = student

  return (
    <div
      className="flex flex-row space-x-4 items-center"
    >
      {/* Full rounded picture */}
      <img
        className="w-12 h-12 rounded-full bg-gray-500 object-contain"
        src={picture}
      />
      {/* Student name */}
      <span className="text-sm lg:text-base font-semibold text-black dark:text-white duration-150 ease-in-out">
        {fullName}
      </span>
    </div>
  )
}

export default StudentName
