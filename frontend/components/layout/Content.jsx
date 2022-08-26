/* eslint-disable react/prop-types */
const Content = ({ children }) => {
  return (
    <div className="h-screen overflow-y-auto justify-start items-start ml-14 md:ml-64 bg-gray-800">
      <div className="flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default Content
