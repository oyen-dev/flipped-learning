const Content = ({ children }) => {
  return (
    <div className="h-full overflow-y-auto justify-start items-start ml-14 pt-2 px-2 md:ml-64">
      <div className="flex flex-col items-start justify-center px-2 py-2 space-y-5">
        {children}
      </div>
    </div>
  )
}

export default Content
