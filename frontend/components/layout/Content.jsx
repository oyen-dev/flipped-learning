/* eslint-disable react/prop-types */
const Content = ({ children }) => {
  return (
    <div className="h-screen overflow-y-auto justify-start items-start ml-14 pt-2 px-2 md:ml-64 bg-gray-800">
      <div className="flex flex-col justify-center px-2 py-2">
        {children}
      </div>
    </div>
  )
}

export default Content
