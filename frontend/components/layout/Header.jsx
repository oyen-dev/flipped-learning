const Header = () => {
  return (
    <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
      <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h- bg-gray-800 border-none">
        Admin
      </div>
      <div className="flex justify-center items-center h-14 bg-gray-800 header-right">
        Right Side
      </div>
    </div>
  )
}

export default Header
