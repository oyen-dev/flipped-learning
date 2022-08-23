/* eslint-disable react/prop-types */
const Content = ({ children }) => {
  return (
    <div className="h-full justify-center items-center ml-14 mt-14 mb-10 md:ml-64">
      <div className="flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default Content
