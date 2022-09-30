const Class = (props) => {
  const { title, clases, major } = props
  return (
    <div className="flex flex-col w-full items-center justify-center bg-[#accbe1] text-black dark:bg-gray-900 dark:text-white px-5 pt-5 pb-2 rounded-md transition-all ease-in-out duration-300">
      <div className="flex flex-col w-full h-44 items-start justify-between bg-[url('https://miro.medium.com/max/1400/1*dJ49PZ3OTzFJfA3Rr-xslw.png')] bg-center object-contain object-center px-3 py-3 rounded-md">
        <div className="flex w-full items-center justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-gear cursor-pointer fill-white hover:fill-blue-500 duration-150"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
        </div>

        <div className="flex flex-col w-full items-start justify-start text-white">
          <p className="mb-0 text-xs hover:font-semibold duration-150 ease-in">
            Senin 07:00 AM - 08:30 AM
          </p>
          <p className="mb-0 text-xs hover:font-semibold duration-150 ease-in">
            Rabu 09:15 AM - 11:30 AM
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-center space-y-1 pt-2">
        <p className="mb-0 text-center font-bold text-base">{title}</p>
        <p className="mb-0 text-center text-sm font-thin whitespace-nowrap">
          {clases} - {major}
        </p>
      </div>
    </div>
  )
}

export default Class